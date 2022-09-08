<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Managers\UploadManager;

use App\Models\Announce;
use App\Models\Division;
use Carbon\Carbon;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AnnounceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;

        $announces = Announce::query()->with('division');
        if ($user->abilities->contains("view_owner_content") && $user->user_roles->contains("user")) {
            $announces = $announces->where('user_sap_id', $sap_id);
        }

        if (is_null(Request::input('fdivision_selected'))) {
            $fdivision_selected = (int)$user->person->division->division_id;
        } else {
            $fdivision_selected = (int)Request::input('fdivision_selected');
        }

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($fdivision_selected)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

        if ($fdivision_selected !== 0) { // Case ค้นหาแบบระบุแผนก
            $announces = $announces->where('division_id', $fdivision_selected);
        } else { // Case ค้นหาทุกแผนก
            $ftopic = Request::input('ftopic');
            if (is_null($ftopic)) {  // Case ที่ไม่ได้ใส่ filter หัวข้อข่าวประกาศ กรณีค้นหาทุกแผนก
                return Redirect::back()->withErrors(['msg' => 'กรุณาระบุ "หัวข้อข่าว" กรณีต้องการค้นจากทุก สาขา/หน่วยงาน']);
            } else {
                $announces = $announces->where('division_id', '>', $fdivision_selected);
            }
        }

        $fexpire_type = Request::input('fexpire_type');
        if (strcmp("expire", $fexpire_type) === 0) {
            //หาเฉพาะข่าวหมดอายุ
            $announces = $announces->whereDate('expire_date', '<=', now()->format('Y-m-d'));
        } elseif (strcmp("alive", $fexpire_type) === 0) {
            //หาเฉพาะข่าวไม่หมดอายุ
            $announces = $announces->whereDate('expire_date', '>', now()->format('Y-m-d'));
        }

        $announces = $announces->when(Request::input('ftopic'), function ($query, $ftopic) {
            $query->where('topic', 'LIKE', "%{$ftopic}%");
        })
        ->orderBy('created_at', 'desc')
        ->paginate(5)
        ->withQueryString();

        return Inertia::render('Admin/Announcement/Index', [ 'announces' => $announces, 'fdivision_selected' => $fdivision_selected ]);
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
        return Inertia::render('Admin/Announcement/DataForm', compact('divisions', 'fdivision_selected'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $attach_files = [];
        $user = Auth::user();
        $sap_id = $user->sap_id;

        request()->validate([
            'division_id' => ['required', 'integer', 'min:0'],
            'expire_date' => ['required'],
            'topic' => ['required'],
            // 'detail_delta' => ['required', 'string'],
        ], [
            'division_id.required' => 'ต้องเลือก สาขา/หน่วยงาน ทุกครั้ง',
            'expire_date.required' => 'ต้องเลือกวันหมดอายุของข่าวประกาศ ทุกครั้ง',
            'topic.required' => 'ต้องระบุหัวข้อข่าวประกาศ ทุกครั้ง',
            // 'detail_delta.string' => 'ต้องระบุเนื้อหาข่าวประกาศ ทุกครั้ง',
        ]);

        if ((int)Request::input('division_id') === 0) {
            // default ถ้าไม่มีให้เลือก ที่หน้า web จะส่งมาเป็น 0 (option ตามสาขาหรือหน่วยงานผู้ประกาศ)
            // จึงดึงเอา division_id ของคนที่ทำการ login มาใช้งานโดยรับมาจาก Auth
            $division_id = $user->person->division->division_id;
        } else {
            $division_id = Request::input('division_id');
        }

        // 3 Line ล่าง ใช้ debug ค่าต่างๆที่ส่งเข้ามาดูก่อน โดยยังไม่เก็บลง DB
        // \Log::info(Request::all());
        // \Log::info($division_id);
        // return Redirect::route('admin.announce');

        try {
            if (Request::hasFile('atFiles')) {
                foreach (Request::file('atFiles') as $attach) {
                    $storePath = 'pdf/announce_attach_file/' . $division_id;
                    $origFileName = $attach->getClientOriginalName();

                    $uniqueFileName = (new UploadManager())->store($attach, true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

                    $attach_files[] = ['orig_name'=> $origFileName, 'unique_name'=> $uniqueFileName];
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มไฟล์แนบได้เนื่องจาก '.$e->getMessage()]);
        }

        //\Log::info($attach_files);

        try {
            Announce::create([
                'topic'=> Request::input('topic'),
                //'detail_delta'=> json_decode(Request::input('detail_delta'), true),
                'detail_delta'=> Request::input('detail_delta'),
                'detail_html'=> Request::input('detail_html'),
                'attach_files'=> $attach_files,
                'expire_date'=>Request::input('expire_date'),
                'type'=>Request::input('type'),
                'user_sap_id'=> $sap_id,
                'division_id'=>$division_id,
                'pinned'=>Request::input('pinned')
            ]);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'จัดเก็บข้อมูลประกาศไม่สำเร็จเนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Insert เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            $sap_id,
            'Announce Management (จัดการข่าวประกาศ)',
            'insert',
            'มีการเพิ่มข้อมูลข่าวประกาศใหม่ เรื่อง:'.Request::input('topic'),
            'info'
        );

        return Redirect::route('admin.announce', ['fdivision_selected' => $division_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Announce $Announce)
    {
        $divisions = Division::all();
        $fdivision_selected = $Announce->division_id;
        $action = "edit";

        // ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
        if (! $this->checkBranchAdminCanAccessContent($fdivision_selected)) {
            return Inertia::render('Admin/Errors/ErrorPermission'); //ไม่มีสิทธิเข้าถึงข้อมูลของ สาขา/หน่วย อื่นๆ
        }

        return Inertia::render('Admin/Announcement/DataForm', ['action' => $action,
                                                        'divisions' => $divisions,
                                                        'announce' => $Announce,
                                                        'fdivision_selected' => $fdivision_selected
                                                    ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Announce $Announce)
    {
        // logger($Announce);
        // dd($Announce);

        $user = Auth::user();
        $sap_id = $user->sap_id;
        //$has_attach_file = false;

        if ((int)Request::input('division_id') === 0) {
            // default ถ้าไม่มีให้เลือก ที่หน้า web จะส่งมาเป็น 0 (option ตามสาขาหรือหน่วยงานผู้ประกาศ)
            // จึงดึงเอา division_id ของคนที่ทำการ login มาใช้งานโดยรับมาจาก Auth
            $division_id = $user->person->division->division_id;
        } else {
            $division_id = Request::input('division_id');
        }

        $old_attachments = Request::input('old_attachments') ? Request::input('old_attachments') : [];
        //\Log::info("Old Attach Files to Keep");
        //\Log::info($old_attachments);
        $count_old_attachments = count($old_attachments);
        $count_db_attach_files = count($Announce->attach_files);
        $attach_files = [];
        $delete_files = [];
        $new_attach_files = [];

        $old_orig_name = array_column($old_attachments, 'orig_name');
        foreach ($Announce->attach_files as $item) {
            if (! in_array($item['orig_name'], $old_orig_name, true)) {
                $delete_files[] = $item;
            } else {
                $attach_files[] = $item;
            }
        } // ได้ List ไฟล์ที่จะทำการลบ และไฟล์เก่าที่จะคงเอาไว้เรียบร้อยแล้ว

        // ถ้ามีไฟล์ใหม่ ให้ทำการเก็บไฟล์ก่อน update database
        try {
            if (Request::hasFile('atFiles')) {
                foreach (Request::file('atFiles') as $attach) {
                    //$fileName = uniqid().'.pdf';
                    $storePath = 'pdf/announce_attach_file/' . $division_id;
                    $origFileName = $attach->getClientOriginalName();
                    $uniqueFileName = (new UploadManager())->store($attach, true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
                    $attach_files[] = ['orig_name'=> $origFileName, 'unique_name'=> $uniqueFileName];
                    $new_attach_files = ['orig_name'=> $origFileName, 'unique_name'=> $uniqueFileName];
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มไฟล์แนบใหม่ได้ เนื่องจาก '.$e->getMessage()]);
        }

        try {
            $Announce->topic = Request::input('topic');
            $Announce->detail_delta = Request::input('detail_delta');
            $Announce->detail_html = Request::input('detail_html');
            $Announce->attach_files = $attach_files;
            $Announce->expire_date = Request::input('expire_date');
            $Announce->user_sap_id = $sap_id;
            $Announce->division_id = $division_id;
            $Announce->save();
        } catch (\Exception  $e) {
            // ถ้า update db ไม่สำเร็จ ให้ลบไฟล์แนบใหม่ที่เก็บไปแล้วออกด้วย
            if (count($new_attach_files) > 0) {
                foreach ($new_attach_files as $delete_file) {
                    Storage::delete($delete_file['unique_name']);
                    //\Log::info($delete_file['unique_name']);
                }
            }
            return Redirect::back()->withErrors(['msg' => 'ทำการแก้ไขข่าวประกาศไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        // ลบไฟล์แนบเก่าที่เคยเก็บไว้แล้ว ถ้ามีการลบไฟล์ออกจากการ update
        if (count($delete_files) > 0) {
            //\Log::info('Delete old attach files');
            foreach ($delete_files as $delete_file) {
                Storage::delete($delete_file['unique_name']);
                //\Log::info($delete_file['unique_name']);
            }
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            $sap_id,
            'Announce Management (จัดการข่าวประกาศ)',
            'update',
            'มีการแก้ไขข้อมูลข่าวประกาศ ID:'.$Announce->id.' เรื่อง:'.Request::input('topic'),
            'info'
        );

        return Redirect::route('admin.announce', ['fdivision_selected' => $division_id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $announce = Announce::find((int)$id);
        $delete_attach_files = $announce->attach_files;

        try {
            // ลบข้อมูลใน db
            $announce->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ทำการลบข่าวประกาศไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        // ลบไฟล์แนบหลังจากลบข้อมูลใน db
        if (count($delete_attach_files) > 0) {
            foreach ($delete_attach_files as $delete_file) {
                Storage::delete($delete_file['unique_name']);
            }
        }

        // เก็บ Log หลังจาก Delete เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Announce Management (จัดการข่าวประกาศ)',
            'delete',
            'มีการลบข้อมูลข่าวประกาศ ID:'.$id.' เรื่อง:'.Request::input('topic'),
            'info'
        );

        return Redirect::route('admin.announce', ['fdivision_selected' => $announce->division_id]);
    }

    public function listAll()
    {
        $user = Auth::user();
        $user_division = $user->person->division->division_id;
        $sap_id = $user->sap_id;

        if ($user->abilities->contains("view_all_content") || $user->abilities->contains("view_division_content")) {
            // list ครั้งแรกให้แสดง เฉพาะของสาขา ของผู้ใช้เท่านั้น และยังไม่หมดอายุ
            return Announce::with('division')->where('division_id', $user_division)->whereDate('expire_date', '>', now()->format('Y-m-d'))->orderBy('created_at', 'desc')->get();
        } elseif ($user->abilities->contains("view_owner_content")) {
            // list ครั้งแรกให้แสดง เฉพาะข่าวประกาศของตนเองเท่านั้น
            return Announce::with('division')->where('user_sap_id', $sap_id)->whereDate('expire_date', '>', now()->format('Y-m-d'))->orderBy('created_at', 'desc')->get();
        }
    }

    public function listShow($record)
    {
        // list ประกาศทั้งหมดที่เผยแพร่แล้ว และยังไม่หมดอายุ โดยเรียงลำดับเอาที่ ปักหมุดมาก่อน และเรียงวันที่เผยแพร่ล่าสุดขึ้นมาก่อน
        if ($record > 0) {
            return Announce::with('division')->whereDate('expire_date', '>', now()->format('Y-m-d'))->where('publish_status', 1)->orderBy('pinned', 'desc')->orderBy('publish_date', 'desc')->take($record)->get();
        } else {
            return Announce::with('division')->whereDate('expire_date', '>', now()->format('Y-m-d'))->where('publish_status', 1)->orderBy('pinned', 'desc')->orderBy('publish_date', 'desc')->get();
        }
    }

    public function listMe($slug)
    {
        if (Auth::user()) {
            $me =  Announce::with('division')->with('person')->whereSlug($slug)->first();
            return Inertia::render('AnnounceDetails', ['announceItem' => $me]);
        } else {
            $me =  Announce::with('division')->with('person')->whereSlug($slug)->whereDate('expire_date', '>', now()->format('Y-m-d'))->where('publish_status', 1)->first();
            if ($me) {
                return Inertia::render('AnnounceDetails', ['announceItem' => $me]);
            } else {
                return Inertia::render('Admin/Errors/NotFound');
            }
        }
    }

    public function downloadPdf()
    {
        $file = Request::input('pdf_file');
        // logger($file);
        // logger(Storage::url($file));
        //return response()->download('storage/'.$file);
        return Storage::download($file);
    }

    public function togglePublish(Announce $Announce)
    {
        $publish_status = $Announce->publish_status ? 'ยกเลิกเผยแพร่' : 'เผยแพร่';
        try {
            if (! $Announce->publish_status) {
                $error_msg = "เผยแพร่ข่าวประกาศไม่สำเร็จ";
                $Announce->publish_date = Carbon::now();
            } else {
                $error_msg = "ยกเลิกการเผยแพร่ข่าวประกาศไม่สำเร็จ";
            }
            $Announce->publish_status = ! $Announce->publish_status;
            $Announce->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => $error_msg.' เนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก togglePublish เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Announce Management (จัดการข่าวประกาศ)',
            'publish',
            'มีการเปลี่ยนแปลงการเผยแพร่ข่าวประกาศ ID:'.$Announce->id.' เรื่อง:'.$Announce->topic.' เป็น '.$publish_status,
            'info'
        );

        return Redirect::route('admin.announce', ['fdivision_selected' => $Announce->division_id]);
    }

    public function togglePin(Announce $Announce)
    {
        $pin_status = $Announce->pinned ? 'ยกเลิกปักหมุด' : 'ปักหมุด';
        try {
            if (! $Announce->pinned) {
                $error_msg = "ปักหมุดข่าวประกาศไม่สำเร็จ";
            } else {
                $error_msg = "ยกเลิกการปักหมุดข่าวประกาศไม่สำเร็จ";
            }
            $Announce->pinned = ! $Announce->pinned;
            $Announce->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => $error_msg.' เนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก togglePin เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Announce Management (จัดการข่าวประกาศ)',
            'pinned',
            'มีการเปลี่ยนแปลงการปักหมุดข่าวประกาศ ID:'.$Announce->id.' เรื่อง:'.$Announce->topic.' เป็น '.$pin_status,
            'info'
        );

        return Redirect::route('admin.announce', ['fdivision_selected' => $Announce->division_id]);
    }

    // ใช้ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
    private function checkBranchAdminCanAccessContent($division_id)
    {
        if (Auth::user()->can('view_division_content') && (request()->user()->person->division_id != $division_id)) {
            $resp = (new LogManager())->store(
                Auth::user()->sap_id,
                'Announce Management (จัดการข่าวประกาศ)',
                'access',
                'มีการพยายามเข้าถึงข้อมูลข่าวประกาศที่ไม่ใช่ สาขา/หน่วย ของตนเอง หมายเลข:'.$division_id,
                'security'
            );
            return false;
        }

        return true;
    }
}
