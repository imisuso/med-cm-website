<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Managers\UploadManager;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Person;
use App\Models\Division;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // ถูก check จาก web.php แล้วว่าต้องมี ability 'manage_person' เท่านั้นถึงจะเข้ามา route นี้ได้
        //$user = Auth::user();

        //
        // $persons = Person::query()
        //         ->when(Request::input('fdivision_selected'), function ($query, $division) {
        //             $query->where('division_id', $division);
        //         }, function ($query) {
        //             $user = Auth::user();
        //             $query->where('division_id', $user->person->division_id);
        //         })
        //         ->when(Request::input('search'), function ($query, $search) {
        //             $query->where('fname_th', 'like', "%{$search}%")
        //                   ->orWhere('lname_th', 'like', "%{$search}%")
        //                   ->orWhere('sap_id', 'like', "%{$search}%");
        //         })
        //         ->with('division')
        //         ->orderBy('type')
        //         ->orderBy('profiles->leader', 'desc')
        //         ->orderBy('display_order', 'asc')
        //         ->orderBy('fname_th', 'asc')
        //         ->paginate(5)
        //         ->withQueryString();

        $divisionId = request()->fdivision_selected ?? request()->user()->person->division_id;

        //logger($divisionId);
        if (strcmp($divisionId, "0") !== 0) {
            $query = Person::query()->where('division_id', $divisionId)->filterBySearch(request()->search);
        } else {
            $query = Person::query()->where('division_id', '>', 0)->filterBySearch(request()->search);
        }
        // ถ้าไม่ใช้ query scrope ที่เขียนไว้ใน model ก็ต้องใช้ส่วนล่างนี้ในการ query ต่อ
        // if ($search = request()->search) {
        //     $query->where(function ($query) use ($search) {
        //         $query->where('fname_th', 'like', "%{$search}%")
        //             ->orWhere('lname_th', 'like', "%{$search}%")
        //             ->orWhere('sap_id', 'like', "%{$search}%");
        //     });
        // }

        $persons = $query->with('division')
        ->orderBy('type')
        ->orderBy('profiles->leader', 'desc')
        ->orderBy('display_order', 'asc')
        ->orderBy('fname_th', 'asc')
        ->paginate(5)
        ->withQueryString();

        return Inertia::render('Admin/Person/Index', [
            'persons' => $persons,
            'filters' => Request::only(['fdivision_selected', 'search'])
        ]);
    }

    public function index_order($division_slug)
    {
        //$user = Auth::user();
        $division_select = Division::select('division_id', 'type')->where('slug', $division_slug)->first();
        $division_id = $division_select->division_id;
        $person_type = Person::select('type')->where('division_id', $division_id)->groupBy('type')->orderBy('type', 'asc')->get();
        // \Log::info($division_slug);
        // \Log::info($division_id);

        return Inertia::render('Admin/Person/PersonOrder', ['person_types' => $person_type, 'division_id' => $division_id, 'division_slug' => $division_slug]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return 'create';
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store()
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;
        $fdivision_selected = Request::input('fdivision_selected');

        try {
            if (Request::hasFile('image')) {
                $division_id = Request::input('division_selected');
                $storePath = 'images/person/' . $division_id;
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                $imgDB = "";
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มรูปภาพบุคคลากรได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            //$certificateList = Request::input('certificateList');
            // \Log::info($certificateList);
            // \Log::info(json_encode($certificateList));

            Person::create([
                'image'=> $imgDB,
                'division_id'=> (int) Request::input('division_selected'),
                'sap_id'=>Request::input('sap_id'),
                'title_th'=>Request::input('title_th'),
                'title_en'=>Request::input('title_en'),
                'fname_th'=>Request::input('fname_th'),
                'fname_en'=>Request::input('fname_en'),
                'lname_th'=>Request::input('lname_th'),
                'lname_en'=>Request::input('lname_en'),
                'rname_full_th'=>Request::input('rname_full_th'),
                'rname_full_en'=>Request::input('rname_full_en'),
                'rname_short_th'=>Request::input('rname_short_th'),
                'rname_short_en'=>Request::input('rname_short_en'),
                'type'=>Request::input('type'),
                'group'=>(int)Request::input('group'),
                'position_mgnt'=>Request::input('position_mgnt'),
                'position_division'=>Request::input('position_division'),
                'position_academic'=>(int)Request::input('position_academic'),
                'reward'=>Request::input('reward'),
                'profiles'=>['leader'=> Request::input('leader')],
                'cert'=>Request::input('certificateList'),
                'user_previous_act'=>$sap_id,
                'user_last_act'=>$sap_id
            ]);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'จัดเก็บข้อมูลบุคคลากรไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // เก็บ Log หลังจาก Insert เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            $sap_id,
            'Person Management (จัดการบุคคลากร)',
            'insert',
            'มีการเพิ่มข้อมูลบุคคลากรใหม่ของ sap_id:'.Request::input('sap_id'),
            'info'
        );

        //return Redirect::route('admin.person')->with('fdivision_selected', $fdivision_selected);
        return Redirect::route('admin.person', ['fdivision_selected' => $fdivision_selected]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Person::select('slug', 'title_th', 'fname_th', 'lname_th', 'image', 'type', 'status')->where('sap_id', $id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Person $Person)
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;
        $has_update_image = false;
        $fdivision_selected = Request::input('fdivision_selected');

        try {
            if (Request::hasFile('image')) {
                $has_update_image = true;
                $oldimage = Request::input('oldimage');
                $division_id = Request::input('division_selected');
                $storePath = 'images/person/' . $division_id;
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                if (Request::input('oldimage')) {
                    $imgDB = Request::input('oldimage');
                } else {
                    $imgDB = "";
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขรูปภาพบุคคลากรได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            //$certificateList = Request::input('certificateList');
            //  \Log::info($certificateList);
            //  \Log::info(json_encode($certificateList));
            //logger(Request::input('leader'));
            $profiles = $Person->profiles;
            $profiles['leader'] = (bool)Request::input('leader');

            $Person->image = $imgDB;
            $Person->division_id = (int)Request::input('division_selected');
            $Person->sap_id = Request::input('sap_id');
            $Person->title_th = Request::input('title_th');
            $Person->title_en = Request::input('title_en');
            $Person->fname_th = Request::input('fname_th');
            $Person->fname_en = Request::input('fname_en');
            $Person->lname_th = Request::input('lname_th');
            $Person->lname_en = Request::input('lname_en');
            $Person->rname_full_th = Request::input('rname_full_th');
            $Person->rname_full_en = Request::input('rname_full_en');
            $Person->rname_short_th = Request::input('rname_short_th');
            $Person->rname_short_en = Request::input('rname_short_en');
            $Person->type = Request::input('type');
            $Person->group = (int)Request::input('group');
            $Person->position_mgnt = Request::input('position_mgnt');
            $Person->position_division = Request::input('position_division');
            $Person->position_academic =  (int)Request::input('position_academic');
            $Person->reward = Request::input('reward');
            $Person->profiles = $profiles;
            $Person->cert = Request::input('certificateList');
            $Person->user_previous_act = $Person->user_last_act;
            $Person->user_last_act = $sap_id;

            $Person->save();
        } catch (\Exception  $e) {
            // ลบรูปใหม่ที่เพิ่ง upload ถ้า update ฐานข้อมูลไม่สำเร็จ
            Storage::delete($imgDB);
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูลบุคคลากรได้', 'sysmsg' => $e->getMessage()]);
        }

        // ลบรูปเก่าหลังจาก update ข้อมูลทุกอย่างเรียบร้อยแล้ว (ถ้ามีการ update รูป)
        if ($has_update_image) {
            Storage::delete($oldimage);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            $sap_id,
            'Person Management (ดูข้อมูลทั้งหมดของบุคคลากรเป็นรายคน)',
            'update',
            'มีการอัพเดทข้อมูลบุคคลากรของ sap_id:'.Request::input('sap_id'),
            'pdpa'
        );
        ////Session::put('fdivision_selected', $fdivision_selected);
        //return Redirect::route('admin.person')->with('fdivision_selected', $fdivision_selected);
        return Redirect::route('admin.person', ['fdivision_selected' => $fdivision_selected]);
    }

    public function updatePersonDisplayOrder()
    {
        $PersonList = Request::input('person_list');
        $division_slug = Request::input('division_slug');
        $unit_name = Division::select('name_th', 'type')->where('slug', $division_slug)->first();
        //\Log::info($PersonList);
        try {
            foreach ($PersonList as $person) {
                $db_person = Person::select('id', 'display_order', 'type')->find($person['id']);
                if ($db_person->display_order !== $person['display_order']) {
                    //\Log::info($person['id']);
                    $db_person->display_order = $person['display_order'];
                    $db_person->save();
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลบุคคลากรบน website ไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'Person Order Display (เรียงลำดับการแสดงผลของบุคคลากร)',
            'order',
            'มีการเรียงลำดับการแสดงผลของบุคคลากร:'.$unit_name->division_type.$unit_name->name_th,
            'info'
        );
        
        return Redirect::route('admin.person_order', $division_slug);
    }

    public function updatePersonDisplayStatus(Person $Person)
    {
        $fdivision_selected = Request::input('fdivision');
        // if (Session::has('fdivision_selected')) {
        //     $fdivision_selected = Session::pull('fdivision_selected');
        // }
        // logger($fdivision_selected);
        // dd($fdivision_selected);
        try {
            $Person->status = ! $Person->status;
            $Person->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลบุคคลากรบน website ไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $status = $Person->status ? 'เปิด' : 'ปิด';
        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'Person Display Status (เปิด/ปิด การแสดงผลของบุคคลากร)',
            'update',
            'มีการเปลี่ยนสถานะการแสดงผลของบุคคลากร sap_id:'.$Person->sap_id . ' เป็น ' . $status,
            'info'
        );
        
        //return Redirect::back()->with('fdivision_selected', $fdivision_selected);
        return Redirect::route('admin.person', ['fdivision_selected' => $fdivision_selected]);
        //return Redirect::route('admin.person')->with('fdivision_selected', $fdivision_selected);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //\Log::info(Request::all());
        $fdivision_selected = Request::input('fdivision_selected');
        //logger($fdivision_selected);

        try {
            $image = Request::input('image');
            if (! is_null($image)) {
                Storage::delete($image);
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปภาพของบุคคลากรได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            $id = Request::input('id');
            $target = Person::select('sap_id')->whereId((int)$id)->first();
            Person::whereId((int)$id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูลบุคคลากรได้', 'sysmsg' => $e->getMessage()]);
        }
        
        // เก็บ Log หลังจาก Delete เรียบร้อยแล้ว
        //$status = $Person->status ? 'เปิด' : 'ปิด';
        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'Person Management (ลบข้อมูลบุคคลากร)',
            'delete',
            'มีการลบข้อมูลของบุคคลากร sap_id:'.$target->sap_id,
            'info'
        );

        //return Redirect::route('admin.person')->with('fdivision_selected', $fdivision_selected);
        return Redirect::route('admin.person', ['fdivision_selected' => $fdivision_selected]);
    }

    public function listProfessorByDivisionId($id)
    {
        $listPerson = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'cert', 'profiles', 'position_division')
                        ->where('division_id', $id)->where('status', true)->where('type', 'a')->whereIn('position_academic', [1, 2, 3, 4])
                        ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        return $listPerson;
    }

    public function listDoctorByDivisionId($id)
    {
        $listPerson = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'cert', 'profiles', 'position_division')
                        ->where('division_id', $id)->where('status', true)->where('type', 'b')->whereIn('position_academic', [5, 6])
                        ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        return $listPerson;
    }

    public function listOfficerByDivisionId($id)
    {
        $listPerson = Person::select('title_th', 'fname_th', 'lname_th', 'image', 'cert', 'position_division', 'profiles')
                        ->where('division_id', $id)->where('status', true)->where('type', 'b')->where('position_academic', 0)
                        ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        return $listPerson;
    }

    public function listPersonDisplayByDivisionId($id)
    {
        $listPerson = Person::where('division_id', $id)->where('status', true)->orderBy('type')
                        ->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        return $listPerson;
    }

    public function listPersonByDivisionAndType()
    {
        $division_id = Request::input('division_id');
        $type = Request::input('type');

        // \Log::info($division_id);
        // \Log::info($type);
        $listPerson = Person::with('division')->where('division_id', $division_id)->where('type', $type)
                            ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')
                            ->orderBy('fname_th', 'asc')->get();
        // \Log::info($listPerson);
        return $listPerson;
    }
}
