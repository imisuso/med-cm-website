<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Managers\UploadManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        //\Log::info($request->all());
        // $division_id = $request->division_id;
        $store_path = $request->store_path ?? 'upload';
        $validator = Validator::make($request->all(),[
            //'file' => 'required|mimes:doc,docx,pdf,txt,csv|max:2048',
            'image_file'  => 'required|mimes:png,jpg,jpeg,gif|max:2305',
        ]);

        if($validator->fails()) {

            return response()->json([
                'success' => false,
                'error'=>$validator->errors()
                ], 401);
         }

        //store your file into directory
        if ($file = $request->file('image_file')) {
            $path = (new UploadManager)->store($file, true, $store_path ); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            $url = Storage::url($path);

            return response()->json([
                "success" => true,
                "message" => "File successfully uploaded",
                "url" => $url
            ]);
        }

        //store your file into directory
        // if ($file = $request->file('image_file')) {
        //     $file_name = $file->hashName();

        //     $path = $file->storePubliclyAs($store_path, $file_name, 'public');

        //     //$url = Storage::url('branch_content/' . $division_id . '/images/' . $file_name);
        //     $url = Storage::url($store_path . '/' . $file_name);
        //     //$name = $file->getClientOriginalName();

        //     // \Log::info($file_name);
        //     // \Log::info($path);
        //     // \Log::info($url);

        //     return response()->json([
        //         "success" => true,
        //         "message" => "File successfully uploaded",
        //         "url" => $url
        //     ]);
        // }

    }

//    public function delete( Request $request ) {
//        //\Log::info($request->all());
//
//        foreach($request->imgFiles as $file) {
//            //\Log::info($file);
//            $strPathReplace = str_replace('storage/', 'public/', $file);
//            //\Log::info($strPathReplace);
//            Storage::delete($strPathReplace);
//        }
//
//        //Storage::delete(['techvblogs.jpg', 'sslforweb.jpg']);
//
//        return response()->json([
//            "success" => true
//        ]);
//    }

    public function delete( Request $request ) {
        $imgFiles = $request->input('imgFiles'); // รับเป็น Array

        if (!empty($imgFiles) && is_array($imgFiles)) {
            foreach ($imgFiles as $url) {
                try {
                    // 1. แปลง URL เป็น Path ใน S3
                    // สมมติ URL: https://my-bucket.s3.ap-southeast-1.amazonaws.com/branch_content/1/images/photo.jpg
                    // เราต้องการแค่: branch_content/1/images/photo.jpg

                    // วิธีแกะ Path แบบง่าย (ขึ้นอยู่กับ URL structure ของคุณ)
                    $path = parse_url($url, PHP_URL_PATH);
                    $path = ltrim($path, '/'); // เอา / ตัวหน้าออก

                    // หรือถ้าใช้ Storage::url() มาก่อน อาจจะต้อง replace domain ทิ้ง
                    // $path = str_replace(Storage::disk('s3')->url(''), '', $url);

                    // 2. สั่งลบจาก S3
                    if (Storage::exists($path)) {
                        Storage::delete($path);
                    }
                } catch (\Exception $e) {
                    // Log error แต่ปล่อยให้ Loop ทำงานต่อ
                    \Log::error("Failed to delete S3 file: " . $url . " Error: " . $e->getMessage());
                }
            }
        }

        return response()->json(['message' => 'Files deleted']);
//        foreach($request->imgFiles as $file) {
//            //\Log::info($file);
//            $strPathReplace = str_replace('storage/', 'public/', $file);
//            //\Log::info($strPathReplace);
//            Storage::delete($strPathReplace);
//        }
//
//        //Storage::delete(['techvblogs.jpg', 'sslforweb.jpg']);
//
//        return response()->json([
//            "success" => true
//        ]);
    }
}
