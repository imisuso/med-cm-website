<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Managers\UploadManager;

use App\Models\Announce;
use App\Models\Division;

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

        logger(Request::input('detail_delta'));

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

                    $uniqueFileName = (new UploadManager)->store($attach, true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

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
    public function update($id)
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;

        if ((int)Request::input('division_id') === 0) {
            // default ถ้าไม่มีให้เลือก ที่หน้า web จะส่งมาเป็น 0 (option ตามสาขาหรือหน่วยงานผู้ประกาศ)
            // จึงดึงเอา division_id ของคนที่ทำการ login มาใช้งานโดยรับมาจาก Auth
            $division_id = $user->person->division->division_id;
        } else {
            $division_id = Request::input('division_id');
        }

        $announce = Announce::find((int)$id);
        $old_attachments = Request::input('old_attachments') ? Request::input('old_attachments') : [];
        //\Log::info("Old Attach Files to Keep");
        //\Log::info($old_attachments);
        $count_old_attachments = count($old_attachments);
        $count_db_attach_files = count($announce->attach_files);
        $attach_files = [];
        $delete_files = [];
        $new_attach_files = [];

        $old_orig_name = array_column($old_attachments, 'orig_name');
        //\Log::info("Array Column");
        //\Log::info($old_orig_name);
        foreach ($announce->attach_files as $item) {
            if (! in_array($item['orig_name'], $old_orig_name, true)) {
                $delete_files[] = $item;
            } else {
                $attach_files[] = $item;
            }
        } // ได้ List ไฟล์ที่จะทำการลบ และไฟล์เก่าที่จะคงเอาไว้เรียบร้อยแล้ว

        // \Log::info("delete");
        // \Log::info($delete_files);
        // \Log::info("keep");
        // \Log::info($attach_files);
        //return Redirect::route('admin.announce');

        // ถ้ามีไฟล์ใหม่ ให้ทำการเก็บไฟล์ก่อน update database
        try {
            if (Request::hasFile('atFiles')) {
                foreach (Request::file('atFiles') as $attach) {
                    //$fileName = uniqid().'.pdf';
                    $storePath = 'pdf/announce_attach_file/' . $division_id;
                    // $filePath = $attach->storePubliclyAs($storePath, $fileName);
                    // $uniqueFileName = 'pdf/announce_attach_file/'. $division_id .'/'.$fileName;
                    $origFileName = $attach->getClientOriginalName();

                    $uniqueFileName = (new UploadManager)->store($attach, true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

                    $attach_files[] = ['orig_name'=> $origFileName, 'unique_name'=> $uniqueFileName];
                    $new_attach_files = ['orig_name'=> $origFileName, 'unique_name'=> $uniqueFileName];
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มไฟล์แนบใหม่ได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            $announce->topic = Request::input('topic');
            $announce->detail_delta = Request::input('detail_delta');
            $announce->detail_html = Request::input('detail_html');
            $announce->attach_files = $attach_files;
            $announce->expire_date = Request::input('expire_date');
            $announce->user_sap_id = $sap_id;
            $announce->division_id = $division_id;
            $announce->save();
            //$ok = true;
        } catch (\Exception  $e) {
            // ถ้า update db ไม่สำเร็จ ให้ลบไฟล์แนบใหม่ที่เก็บไปแล้วออกด้วย
            //\Log::info('Delete new attach files');
            if (count($new_attach_files) > 0) {
                foreach ($new_attach_files as $delete_file) {
                    Storage::delete($delete_file['unique_name']);
                    //\Log::info($delete_file['unique_name']);
                }
            }
            return Redirect::back()->withErrors(['msg' => 'ทำการแก้ไขข่าวประกาศไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        if (count($delete_files) > 0) {
            //\Log::info('Delete old attach files');
            foreach ($delete_files as $delete_file) {
                Storage::delete($delete_file['unique_name']);
                //\Log::info($delete_file['unique_name']);
            }
        }
        
        return Redirect::route('admin.announce');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //\Log::info($id);
         
        $announce = Announce::find((int)$id);
        $delete_attach_files = $announce->attach_files;

        try {
            // ลบข้อมูลใน db
            $announce->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ทำการลบข่าวประกาศไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // ลบไฟล์แนบหลังจากลบข้อมูลใน db
        if (count($delete_attach_files) > 0) {
            foreach ($delete_attach_files as $delete_file) {
                Storage::delete($delete_file['unique_name']);
            }
        }
       

        return Redirect::route('admin.announce');
    }

    public function listAll()
    {
        $user = Auth::user();
        //\Log::info($user->person->division);
        $user_division = $user->person->division->division_id;
        $sap_id = $user->sap_id;

        // \Log::info($user_division);
        // \Log::info($sap_id);
        
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
        $me =  Announce::with('division')->with('person')->whereSlug($slug)->first();
        return Inertia::render(
            'AnnounceDetails',
            [
                                    'announceItem' => $me
                                ]
        );
    }

    public function downloadPdf()
    {
        $file = Request::input('pdf_file');
        // logger($file);
        // logger(Storage::url($file));
        //return response()->download('storage/'.$file);
        return Storage::download($file);
    }

    public function togglePublish($id)
    {
        // \Log::info($id);
        // \Log::info(Request::all());

        if (Request::input('publish_status') === 0) {
            $error_msg = "เผยแพร่ข่าวประกาศไม่สำเร็จ";
            $update_publish_status = true;
        } else {
            $error_msg = "ยกเลิกการเผยแพร่ข่าวประกาศไม่สำเร็จ";
            $update_publish_status = false;
        }

        try {
            $announce = Announce::find((int)$id);
            //\Log::info($announce);
            if ($update_publish_status) {
                date_default_timezone_set("Asia/Bangkok");
                $announce->publish_date = date('Y-m-d H:i:s');
                $announce->publish_status = $update_publish_status;
            } else {
                $announce->publish_status = $update_publish_status;
            }

            $announce->save();
            // Announce::whereId((int)$id)
            //     ->update([
            //     'publish_status'=> $update_publish_status,
            // ]);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => $error_msg, 'sysmsg' => $e->getMessage()]);
        }

        return Redirect::route('admin.announce');
    }

    public function togglePin($id)
    {
        // \Log::info($id);
        // \Log::info(Request::all());

        if (Request::input('pinned') === 0) {
            $error_msg = "ปักหมุดข่าวประกาศไม่สำเร็จ";
            $update_pinned = true;
        } else {
            $error_msg = "ยกเลิกการปักหมุดข่าวประกาศไม่สำเร็จ";
            $update_pinned = false;
        }

        try {
            Announce::whereId((int)$id)
                ->update([
                'pinned'=> $update_pinned,
            ]);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => $error_msg, 'sysmsg' => $e->getMessage()]);
        }

        return Redirect::route('admin.announce');
    }

    // ใช้ตรวจสอบว่าถ้าเป็น admin ของสาขาหรือหน่วยงาน จะไม่สามารถเห็นข้อมูลของ สาขา หรือ หน่วยอื่นที่ไม่ใช่ของตัวเองได้
    private function checkBranchAdminCanAccessContent($division_id)
    {
        if (Auth::user()->can('view_division_content') && (request()->user()->person->division_id != $division_id)) {
            $resp = (new LogManager)->store(
                Auth::user()->sap_id,
                'Person Management (จัดการบุคคลากร)',
                'access',
                'มีการพยายามเข้าถึงข้อมูลบุคลากรที่ไม่ใช่ สาขา/หน่วย ของตนเอง หมายเลข:'.$division_id,
                'security'
            );
            return false;
        }

        return true;
    }
}
