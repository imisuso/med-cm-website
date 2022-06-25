<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;

use App\Managers\UploadManager;
use App\Models\Poster;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PosterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Poster', [
            'posters' => Poster::query()
                ->when(Request::input('search'), function ($query, $search) {
                    $query->where('desc', 'like', "%{$search}%");
                })
                ->paginate(5)
                ->withQueryString()
                ->through(fn ($poster) => [
                    'id' => $poster->id,
                    'content_url' => $poster->content_url,
                    'cover' => $poster->cover,
                    'cover_url' => $poster->cover_url,
                    'desc' => $poster->desc,
                    'status' => $poster->status,
                    'created_at' => $poster->created_at
                ]),
            'filters' => Request::only(['search'])
        ]);

        // // return Inertia::render('Admin/Person', ['persons' => $persons, 'fdivision' => (int)$fdivision_selected] );
        // $posters = Poster::all();
        // //return $posters;
        // return Inertia::render('Admin/Poster', compact('posters'));
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
    public function store()
    {
        //\Log::info(Request::all());

        $validator = Validator::make(Request::all(), [
            //'file' => 'required|mimes:doc,docx,pdf,txt,csv|max:2048',
            'cover'  => 'required|mimes:jpg,jpeg|max:2305',
            'content' => 'required|mimes:jpg,jpeg,pdf|max:2305',
        ]);
  
        if ($validator->fails()) {
            return Redirect::back()->withErrors(['msg' => 'Error File Type', 'sysmsg' => '']);

            // return response()->json([
            //     'success' => false,
            //     'error'=>$validator->errors()
            //     ], 401);
        }

        //Store Cover File
        $cover_store_path = "med_con/cover";
        $cover_file = Request::file('cover');
        $cover_file_name = $cover_file->hashName();
        //$cover_file_name = $cover_file->getClientOriginalName();
        //$path = $cover_file->storePubliclyAs($cover_store_path, $cover_file_name, 'public');  // แบบเก่าที่ใช้งาน
        $cover_path = (new UploadManager)->store(Request::file('cover'), true, $cover_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย


        //Store Content File
        $content_store_path = "med_con/content";
        $content_file = Request::file('content');
        $content_file_name = $content_file->hashName();
        //$content_file_name = $content_file->getClientOriginalName();
        //$path = $content_file->storePubliclyAs($content_store_path, $content_file_name, 'public'); // แบบเก่าที่ใช้งาน
        $content_path = (new UploadManager)->store(Request::file('content'), true, $content_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

        //Store data into DB
        $poster = new Poster;
        $poster->desc = Request::input('desc');
        // $poster->cover = $cover_store_path.'/'.$cover_file_name;
        // $poster->content = $content_store_path.'/'.$content_file_name;
        $poster->cover = $cover_path;
        $poster->content = $content_path;
        $poster->save();

        return Redirect::route('admin.poster');
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

    // แสดง Poster ทั้งหมดที่ status enable โดยสามารถกำหนด limit ได้ ถ้าเป็น 0 คือไม่กำหนด limit
    public function showListEnabledPoster()
    {
        $limit = env('POSTER_LIMIT', 5);

        $posters = Poster::whereStatus(true)->latest()->take($limit)->get();
        return $posters;
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
    public function update(Request $request, $id)
    {
        //
    }

    public function updatePosterDisplayStatus(Poster $Poster)
    {
        try {
            $Poster->status = ! $Poster->status;
            $Poster->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลโปสเตอร์ ไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }
        
        return Redirect::route('admin.poster');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Poster $Poster)
    {
        // $cover_file = $Poster->cover;
        // $content_file = $Poster->content;

        // ลบรูปปกของ poster
        try {
            if (! is_null($Poster->cover)) {
                Storage::delete($Poster->cover);
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปปกโปสเตอร์ได้', 'sysmsg' => $e->getMessage()]);
        }

        // ลบไฟล์เนื้อหาของ poster
        try {
            if (! is_null($Poster->content)) {
                Storage::delete($Poster->content);
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบเนื้อหาโปสเตอร์ได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            Poster::whereId($Poster->id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูลโปสเตอร์ได้', 'sysmsg' => $e->getMessage()]);
        }

        return Redirect::route('admin.poster');
    }
}
