<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Managers\UploadManager;

use App\Models\PersonVersion;
use App\Models\TraceLog;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Person;
use App\Models\Division;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class PersonController extends Controller
{
    // ใส่ remember middleware ไว้ที่ web.php แล้ว เลยทำการ comment ไว้
//    public function __construct()
//    {
//        $this->middleware('remember')->only('index');
//    }

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

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($divisionId)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

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
                        ->with('versions')
                        ->orderBy('profiles->leader', 'desc')
                        ->orderBy('type')
                        ->orderBy('display_order', 'asc')
                        ->orderBy('fname_th', 'asc')
                        ->paginate(6)
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

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($division_id)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

        $person_types = Person::select('type')->where('division_id', $division_id)->groupBy('type')->orderBy('type', 'asc')->get();

        return Inertia::render('Admin/Person/PersonOrder', compact('person_types', 'division_id', 'division_slug'));
        //return Inertia::render('Admin/Person/PersonOrder', ['person_types' => $person_types, 'division_id' => $division_id, 'division_slug' => $division_slug]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $fdivision_selected = (int)request()->fdivision_selected ?? (int)request()->user()->person->division_id;

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($fdivision_selected)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

        $divisions = Division::all();
        return Inertia::render('Admin/Person/DataForm', compact('divisions', 'fdivision_selected'));
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store()
    {
        $user = Auth::user();
        $userin = $user->sap_id;
        //$fdivision_selected = Request::input('fdivision_selected');

        $division_id = Request::input('division_selected');
        $sap_id = Request::input('sap_id');
        $profiles['leader'] = (bool)Request::input('leader');
        $profiles['teacher'] = (bool)Request::input('teacher');

        try {
            if (Request::hasFile('image')) {
                //$division_id = Request::input('division_selected');
                $storePath = 'images/person/' . $division_id;
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                $imgDB = "";
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มรูปภาพบุคลากร ได้เนื่องจาก ' .$e->getMessage()]);
        }

        // ถ้าพบ sap_id เลขนี้ในระบบแล้ว ให้ return error กลับไป
        if (Person::where('sap_id', $sap_id)->first()) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูลบุคลากร ได้เนื่องจากพบหมายเลข sap_id ' .$sap_id.' นี้ถูกใช้งานในระบบแล้ว']);
        }

        try {
            //$certificateList = Request::input('certificateList');
            // \Log::info($certificateList);
            // \Log::info(json_encode($certificateList));

            Person::create([
                'image'=> $imgDB,
                'division_id'=> (int) $division_id,
                'sap_id'=>$sap_id,
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
                'profiles'=>$profiles,
                'cert'=>Request::input('certificateList'),
                'user_previous_act'=>$userin,
                'user_last_act'=>$userin
            ]);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'จัดเก็บข้อมูลบุคลากรไม่สำเร็จ เนื่องจาก ' .$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Insert เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            $userin,
            'Person Management (จัดการบุคลากร)',
            'insert',
            'มีการเพิ่มข้อมูลบุคลากรใหม่ของ sap_id:'.$sap_id,
            'info'
        );

        //return Redirect::route('admin.person')->with('fdivision_selected', $fdivision_selected);
        // ใช้ remember middleware
        return Redirect::route('admin.person');

        // กลับไปยังหน้าของ สาขา/หน่วย ที่ได้ทำการเพิ่มคนเข้าไปใหม่
        //return Redirect::route('admin.person', ['fdivision_selected' => $division_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view(Person $Person)
    {
        $divisions = Division::all();
        $fdivision_selected = $Person->division_id;
        $action = "view";
        $from_history_page = (boolean)Request::input('fromHistoryPage') ?: false;

        //logger($Person);

        // เก็บ Log หลังจากมีการเปิดดูข้อมูลบุคลากร
        $resp = (new LogManager)->store(
            request()->user()->sap_id,
            'Person Management (จัดการบุคลากร)',
            'view',
            "มีการเปิดดูข้อมูลบุคลากรของ : {$Person->title_th}{$Person->fname_th} => {$Person->division->division_type}{$Person->division->name_th}",
            'info'
        );

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($fdivision_selected)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

        if($from_history_page) {
            return Inertia::render('Admin/Person/DataForm', [
                'action' => $action,
                'divisions' => $divisions,
                'person' => $Person,
                'fdivision_selected' => $fdivision_selected,
                'from_history_page' => true
            ]);
        } else {
            return Inertia::render('Admin/Person/DataForm', [
                'action' => $action,
                'divisions' => $divisions,
                'fdivision_selected' => $fdivision_selected,
                'person' => $Person,
            ]);
        }

        //return Inertia::render('Admin/Person/DataForm', compact('action', 'divisions', 'person', 'fdivision_selected'));
        //return Person::select('slug', 'title_th', 'fname_th', 'lname_th', 'image', 'type', 'status')->where('sap_id', $id);
    }

    public function view_version(PersonVersion $PersonVersion)
    {
        $divisions = Division::all();
//        $fdivision_selected = $PersonVersion->division_id;
        $action = "view";

        // เก็บ Log หลังจากมีการเปิดดูข้อมูลบุคลากร
//        $resp = (new LogManager)->store(
//            request()->user()->sap_id,
//            'Person Management (จัดการบุคลากร)',
//            'view',
//            'มีการเปิดดูข้อมูลบุคลากรของ sap_id:'.$Person->sap_id,
//            'info'
//        );

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
//        if (! $this->checkBranchAdminCanAccessContent($fdivision_selected)) {
//            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
//        }

        return Inertia::render('Admin/Person/DataForm', [
            'action' => $action,
            'divisions' => $divisions,
            'person' => $PersonVersion,
            'fdivision_selected' => $PersonVersion->division_id,
            'version' => true
        ]);
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

    public function showBackupHistory(Person $Person) {

        // query เอาชื่อผู้แก้ไขข้อมูลล่าสุดส่งไปด้วย
        if( strcmp($Person->user_last_act, 'api') !== 0 ) {
            $user_last_act = Person::select( 'title_th', 'fname_th', 'lname_th')->where('sap_id', $Person->user_last_act)->first();
            $Person['user_last_act_full_name'] = "{$user_last_act->title_th}{$user_last_act->fname_th} {$user_last_act->lname_th}";
        }

        $Person->division;

        // เรียงลำดับ version จากล่าสุดไปเก่าสุด
        $versions = $Person->versions->sortBy([
            ['trace_log_id', 'desc'],
        ]);

        // ทำเพื่อให้มี division ติดไปด้วยตอนส่ง props และ query เอาชื่อผู้แก้ไขข้อมูลล่าสุดส่งไปด้วย
        if (count($versions) > 0) {
            foreach ($versions as $version) {
                $version->division;
                if( strcmp($version->user_last_act, 'api') !== 0 ){
                    $user_last_act = Person::select( 'title_th', 'fname_th', 'lname_th')->where('sap_id', $version->user_last_act)->first();
                    $version['user_last_act_full_name'] = "{$user_last_act->title_th}{$user_last_act->fname_th} {$user_last_act->lname_th}";

                    // $versions[] = (object) ['name_th' => $version->division->name_th, 'division_type' => $version->division->division_type];
                }
            }
        }

        $myCollectionObj = collect($versions);

        $data = $this->paginate($myCollectionObj);

        return Inertia::render('Admin/Person/BackupHistory', [
            'person' => $Person,
            'person_versions' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Person $Person)
    {
        $divisions = Division::all();
        $fdivision_selected = $Person->division_id;
        $action = "edit";

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($fdivision_selected)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

        return Inertia::render('Admin/Person/DataForm', ['action' => $action,
                                                        'divisions' => $divisions,
                                                        'person' => $Person,
                                                        'fdivision_selected' => $fdivision_selected
                                                    ]);
        //return Inertia::render('Admin/Person/DataForm', compact('action', 'divisions', 'person', 'fdivision_selected'));
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
        $userin = $user->sap_id;

        $person_sap_id = Request::input('sap_id');
        $use_default_image = Request::input('use_default_image');
        $has_update_image = false;
        $division_id = Request::input('division_selected');
        //$fdivision_selected = Request::input('fdivision_selected');

        try {
            if (Request::hasFile('image')) {
                $has_update_image = true;
                $oldimage = Request::input('oldimage');

                $storePath = 'images/person/' . $division_id;
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                // กรณีต้องการลบรูปที่เคยเพิ่มไปแล้วออก และใช้รูปตั้งต้นของระบบ
                if( $use_default_image ) {
                    $has_update_image = true;
                    $oldimage = Request::input('oldimage');
                    $imgDB = null;
                }
                else if (Request::input('oldimage')) {
                    $imgDB = Request::input('oldimage');
                }
                else {
                    $imgDB = null;
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขรูปภาพบุคลากรได้ เนื่องจาก '. $e->getMessage()]);
        }

        // ถ้า sap_id ไม่เท่ากับเลขเดิม และ พบเลขนี้ในระบบแล้ว ให้ return error กลับไป
        if (($person_sap_id !== $Person->sap_id) && Person::where('sap_id', $person_sap_id)->first()) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูลบุคลากร ได้เนื่องจากพบหมายเลข sap_id ' .$person_sap_id.' นี้ถูกใช้งานในระบบแล้ว']);
        }

        try {
            //$certificateList = Request::input('certificateList');
            //  \Log::info($certificateList);
            //  \Log::info(json_encode($certificateList));
            $profiles = $Person->profiles;
            $profiles['leader'] = (bool)Request::input('leader');
            $profiles['teacher'] = (bool)Request::input('teacher');

            $Person->image = $imgDB;
            $Person->division_id = (int)Request::input('division_selected');
            $Person->sap_id = $person_sap_id;
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
            $Person->user_last_act = $userin;

            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old = $Person->getOriginal();
            // จัดเก็บค่าที่แก้ไขใหม่
            $Person->save();
        } catch (\Exception  $e) {
            // ถ้ามีการเปลี่ยนรูปใหม่ ให้ลบรูปใหม่ที่เพิ่ง upload ถ้า update ฐานข้อมูลไม่สำเร็จ
            if ($has_update_image) {
                Storage::delete($imgDB);
            }
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูลบุคลากร ได้เนื่องจาก '. $e->getMessage()]);
        }

        // ลบรูปเก่าหลังจาก update ข้อมูลทุกอย่างเรียบร้อยแล้ว (ถ้ามีการ update รูป)
        if ($has_update_image && $oldimage) {
            Storage::delete($oldimage);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $log = (new LogManager)->store(
            $userin,
            'Person Management (จัดการบุคลากร)',
            'update',
            "มีการอัพเดทข้อมูลบุคลากรของ {$Person->title_th}{$Person->fname_th} หน่วย/สาขา : {$Person->division->name_th}",
            'pdpa'
        );

        // สร้าง backup version ของ person model หลังจากสร้าง log แล้วเพื่อ เอาค่า id ของ log เก็บเข้าไปด้วย
        $old['trace_log_id'] = $log ?: 0;
        $old['person_id'] = $old['id'];
        $old['record_updated'] = $old['updated_at'];
        PersonVersion::query()->create($old);

        ////Session::put('fdivision_selected', $fdivision_selected);
        //return Redirect::route('admin.person')->with('fdivision_selected', $fdivision_selected);
        //return Redirect::route('admin.person', ['fdivision_selected' => $division_id]);
        // ใช้ remember middleware
        return Redirect::route('admin.person');
    }

    public function updatePersonDisplayOrder()
    {
        $PersonList = Request::input('person_list');
        $division_slug = Request::input('division_slug');
        $unit_name = Division::select('name_th', 'type')->where('slug', $division_slug)->first();

        try {
            foreach ($PersonList as $person) {
//                $db_person = Person::select('id', 'display_order', 'type')->find($person['id']);
                $db_person = Person::find($person['id']);
                if ($db_person->display_order !== $person['display_order']) {
                    $db_person->display_order = $person['display_order'];
                    $db_person->user_last_act = Auth::user()->sap_id;

                    // เก็บค่าเก่าก่อนทำการแก้ไข
                    $old = $db_person->getOriginal();

                    // จัดเก็บการเรียงลำดับใหม่
                    $db_person->save();

                    // เก็บ Log หลังจาก Update เรียบร้อยแล้ว (รายคน)
                    $log_id = (new LogManager)->store(
                        Auth::user()->sap_id,
                        'Person Management (จัดการบุคลากร)',
                        'order',
                        "มีการแก้ไขลำดับการแสดงผลของ {$db_person->title_th}{$db_person->fname_th} หน่วย/สาขา : {$unit_name->name_th}",
                        'info'
                    );

                    // สร้าง backup version ของ person model หลังจากสร้าง log แล้วเพื่อ เอาค่า id ของ log เก็บเข้าไปด้วย
                    $old['trace_log_id'] = $log_id ?: 0;
                    $old['person_id'] = $old['id'];
                    $old['record_updated'] = $old['updated_at'];
                    PersonVersion::query()->create($old);
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลบุคลากรบน website ไม่สำเร็จเนื่องจาก '.$e->getMessage()]);
        }

//        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
//        $resp = (new LogManager)->store(
//            Auth::user()->sap_id,
//            'Person Management (จัดการบุคลากร)',
//            'order',
//            'มีการเรียงลำดับการแสดงผลของบุคลากร:'.$unit_name->division_type.$unit_name->name_th,
//            'info'
//        );

        return Redirect::route('admin.person_order', $division_slug);
    }

    public function updatePersonDisplayStatus(Person $Person)
    {
        //$fdivision_selected = Request::input('fdivision');
        // if (Session::has('fdivision_selected')) {
        //     $fdivision_selected = Session::pull('fdivision_selected');
        // }
        // logger($fdivision_selected);
        try {
            $Person->status = ! $Person->status;
            $Person->user_last_act = Auth::user()->sap_id;

            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old = $Person->getOriginal();

            $Person->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลบุคลากรบน website ไม่สำเร็จเนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $status = $Person->status ? 'เปิด' : 'ปิด';
        $log_id = (new LogManager)->store(
            Auth::user()->sap_id,
            'Person Management (จัดการบุคลากร)',
            'update',
            "มีการเปลี่ยนสถานะการแสดงผลของบุคลากร : {$Person->title_th}{$Person->fname_th} หน่วย/สาขา : {$Person->division->name_th}  เป็น {$status}",
            'info'
        );

        // สร้าง backup version ของ person model หลังจากสร้าง log แล้วเพื่อ เอาค่า id ของ log เก็บเข้าไปด้วย
        $old['trace_log_id'] = $log_id ?: 0;
        $old['person_id'] = $old['id'];
        $old['record_updated'] = $old['updated_at'];
        PersonVersion::query()->create($old);

        //return Redirect::back()->with('fdivision_selected', $fdivision_selected);
        // ใช้ remember middleware
        return Redirect::route('admin.person');
        //return Redirect::route('admin.person', ['fdivision_selected' => $fdivision_selected]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //\Log::info(Request::all());

        $data = Person::select('image', 'sap_id', 'title_th', 'fname_th', 'division_id')->whereId((int)$id)->first();

        try {
            $person = Person::find((int)$id);
            $person->versions()->delete();
            $person->delete();
//            Person::whereId((int)$id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูลบุคลากร ได้เนื่องจาก '. $e->getMessage()]);
        }

        // ถ้าเคยมีการเก็บรูปมาแล้ว
        if ($data['image']) {
            Storage::delete($data['image']);
        }

        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'Person Management (จัดการบุคลากร)',
            'delete',
            "มีการลบข้อมูลของบุคลากรของ  {$data['title_th']}{$data['fname_th']} หน่วย/สาขา : {$person->division->name_th}",
            'info'
        );

        // ใช้ remember middleware
        return Redirect::route('admin.person', ['rember' => 'forget']);
        //return Redirect::route('admin.person', ['fdivision_selected' => $data['division_id']]);
    }

    public function listProfessorByDivisionId($id)
    {
        // $users = User::where(function ($query) {
        //     $query->select('type')
        //         ->from('membership')
        //         ->whereColumn('membership.user_id', 'users.id')
        //         ->orderByDesc('membership.start_date')
        //         ->limit(1);
        // }, 'Pro')->get();

        // $listPerson = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'cert', 'profiles', 'position_division')
        //                 ->where('division_id', $id)->where('status', true)->where('type', 'a')->whereIn('position_academic', [1, 2, 3, 4])
        //                 ->orWhere('type', 'z')->whereJsonContains('profiles->teacher', true)
        //                 ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        $listPerson = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'cert', 'profiles', 'group', 'position_division')
                        ->where('division_id', $id)->where('status', true)
                        ->where(function ($query) {
                            $query->where('type', 'a')->where('group', 1)
                                ->orWhere('type', 'z')->whereJsonContains('profiles->teacher', true);
                        })
                        ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        return $listPerson;
    }

    public function listDoctorByDivisionId($id)
    {
//        $listPerson = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'cert', 'profiles', 'position_division')
//                        ->where('division_id', $id)->where('status', true)->where('type', 'b')->whereIn('position_academic', [5, 6])
//                        ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        $listPerson = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'cert', 'profiles', 'group', 'position_division')
            ->where('division_id', $id)->where('status', true)->where('type', 'b')->where('group', 2)
            ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        return $listPerson;
    }

    public function listOfficerByDivisionId($id)
    {
//        $listPerson = Person::select('title_th', 'fname_th', 'lname_th', 'image', 'cert', 'position_division', 'profiles')
//                        ->where('division_id', $id)->where('status', true)->where('type', 'b')->where('position_academic', 0)
//                        ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')->orderBy('fname_th', 'asc')->get();
        $listPerson = Person::select('title_th', 'fname_th', 'lname_th', 'image', 'cert', 'group', 'profiles', 'position_division')
            ->where('division_id', $id)->where('status', true)->whereIn('type', ['c','d', 'z'])->where('group', 2)
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

        $listPerson = Person::with('division')->where('division_id', $division_id)->where('type', $type)
                            ->orderBy('profiles->leader', 'desc')->orderBy('display_order', 'asc')
                            ->orderBy('fname_th', 'asc')->get();

        return $listPerson;
    }

    public function paginate($items, $perPage = 10, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    // ใช้ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
    private function checkBranchAdminCanAccessContent($division_id)
    {
        if (Auth::user()->can('view_division_content') && (request()->user()->person->division_id != $division_id)) {
            $resp = (new LogManager)->store(
                Auth::user()->sap_id,
                'Person Management (จัดการบุคลากร)',
                'access',
                'มีการพยายามเข้าถึงข้อมูลบุคลากรที่ไม่ใช่ สาขา/หน่วย ของตนเอง หมายเลข:'.$division_id,
                'security'
            );
            return false;
        }

        return true;
    }
}
