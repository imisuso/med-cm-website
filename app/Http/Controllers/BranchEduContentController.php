<?php

namespace App\Http\Controllers;

use App\Managers\UploadManager;
use App\Models\BranchSubMenu;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BranchEduContentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BranchSubMenu $BranchSubMenu)
    {
        
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
    public function edit($slug)
    {
        $sub_header = BranchSubMenu::whereSlug($slug)->first();
        return Inertia::render('Admin/BranchTemplate/EduContentEditor', ['sub_header' => $sub_header]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BranchSubMenu $BranchSubMenu)
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;
 
        if( (int)Request::input('division_id') === 0 ) {
            // default ถ้าไม่มีให้เลือก ที่หน้า web จะส่งมาเป็น 0 (option ตามสาขาหรือหน่วยงานผู้ประกาศ)
            // จึงดึงเอา division_id ของคนที่ทำการ login มาใช้งานโดยรับมาจาก Auth 
            $division_id = $user->person->division->division_id;
        } else {
            $division_id = Request::input('division_id');
        }

        // Attach file ของเดิมที่เคยเก็บไว้อยู่แล้ว อยู่ที่ว่าตอนจะ update จะมีการลบอะไรออกไปหรือไม่ 
        $old_attachments = Request::input('old_attachments') ? Request::input('old_attachments') : [];

        // $count_old_attachments = count($old_attachments);
        // $count_db_attach_files = count($BranchSubMenu->attach_files);
        $attach_files = [];
        $delete_files = [];
        $new_attach_files = [];

        $old_orig_name = array_column($old_attachments, 'orig_name');
        //\Log::info("Array Column");
        //\Log::info($old_orig_name);

        // เปรียบเทียบกับของที่อยู่ใน db ถ้าใน db ไม่มี แสดงว่าทำการลบออกไปแล้ว เพื่อให้ได้ List ไฟล์ที่จะทำการลบ และไฟล์เก่าที่จะคงเอาไว้
        if( ! is_null($BranchSubMenu->attach_files) ) {
            foreach( $BranchSubMenu->attach_files as $item ) {
                if( ! in_array($item['orig_name'], $old_orig_name, true) ) {
                    $delete_files[] = $item;
                } else {
                    $attach_files[] = $item;
                }
            }
        }

        // ใช้ debug list ไฟล์ที่จะลบและจะเก็บ
        // \Log::info("delete");
        // \Log::info($delete_files);
        // \Log::info("keep");
        // \Log::info($attach_files);
        // return Redirect::route('admin.branch_template_editor')->with('division_id', $division_id);

        // 3 Line ล่าง ใช้ debug ค่าต่างๆที่ส่งเข้ามาดูก่อน โดยยังไม่เก็บลง DB
        // \Log::info(Request::all());
        // \Log::info($division_id);
        // return Redirect::route('admin.branch_template_editor')->with('division_id', $division_id);

        // ถ้ามีไฟล์ใหม่ ให้ทำการเก็บไฟล์ลง disk ก่อนทำการ update database
        try {
            if( Request::hasFile('atFiles') ) {
                foreach( Request::file('atFiles') as $attach) {
                    // $fileName = uniqid().'.pdf';
                    // $storePath = 'public/branch_content/' . $division_id . '/pdf';
                    // $filePath = $attach->storePubliclyAs($storePath, $fileName);
                    // $uniqueFileName = 'branch_content/'. $division_id . '/pdf/' . $fileName;
                    $storePath = 'branch_content/' . $division_id . '/pdf';
                    $origFileName = $attach->getClientOriginalName();

                    $file_path = (new UploadManager)->store($attach, true, $storePath ); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

                    $attach_files[] = ['orig_name'=> $origFileName, 'unique_name'=> $file_path];
                    $new_attach_files = ['orig_name'=> $origFileName, 'unique_name'=> $file_path];
                }
            }
        } catch(\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มไฟล์แนบใหม่ได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            $BranchSubMenu->attach_files = $attach_files;
            $BranchSubMenu->save();

        } catch(\Exception  $e) {
            if( count($new_attach_files) > 0 ) {
                foreach( $new_attach_files as $delete_file ) {
                    Storage::delete($delete_file['unique_name']);
                    //\Log::info($delete_file['unique_name']);
                }
            }
            return Redirect::back()->withErrors(['msg' => 'จัดเก็บข้อมูลเอกสารไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // ทำการลบ ไฟล์แนบเก่าที่ได้มีการลบออกไปแล้ว จาก list ที่ได้หาไว้ก่อนหน้านี้
        if( count($delete_files) > 0 ) {
            foreach( $delete_files as $delete_file ) {
                Storage::delete($delete_file['unique_name']);
                //\Log::info($delete_file['unique_name']);
            }
        }

        //return Redirect::route('admin.show_branch_main_menu', $division_id);
        return Redirect::route('admin.branch_template_editor')->with('division_id', $division_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function downloadPdf()
    {
        $file = Request::input('pdf_file');
        return Storage::download($file);
        //return response()->download('storage/'.$file);

        // $filePath = public_path("dummy.pdf");
    	// $headers = ['Content-Type: application/pdf'];
    	// $fileName = time().'.pdf';

    	// return response()->download($filePath, $fileName, $headers);
    }
}
