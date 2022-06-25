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
        $store_path = $request->store_path;
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

    public function delete( Request $request ) {
        //\Log::info($request->all());

        foreach($request->imgFiles as $file) {
            //\Log::info($file);
            $strPathReplace = str_replace('storage/', 'public/', $file);
            //\Log::info($strPathReplace);
            Storage::delete($strPathReplace);
        }

        //Storage::delete(['techvblogs.jpg', 'sslforweb.jpg']);

        return response()->json([
            "success" => true
        ]);
    }
}
