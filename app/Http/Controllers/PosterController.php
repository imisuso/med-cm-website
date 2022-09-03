<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
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
        return Inertia::render('Admin/Poster/Index', [
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
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Poster/DataForm');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        request()->validate([
            'cover' => ['required', 'mimes:jpg,jpeg', 'max:2305'],
            'content' => ['required','mimes:jpg,jpeg,pdf','max:2305'],
            'desc' => ['required'],
        ], [
            'cover.required' => 'ต้องใส่รูปหน้าปก ทุกครั้ง',
            'cover.mimes' => 'ต้องใส่รูปหน้าปกที่เป็น jpg หรือ jpeg เท่านั้น',
            'cover.max' => 'ต้องใส่รูปหน้าปกขนาดไม่เกิน 2 MB เท่านั้น',
            'content.required' => 'ต้องใส่เนื้อหาไฟล์ ทุกครั้ง',
            'content.mimes' => 'ต้องใส่เนื้อหาไฟล์ที่เป็น jpg, jpeg หรือ pdf เท่านั้น',
            'contentr.max' => 'ต้องใส่เนื้อหาไฟล์ขนาดไม่เกิน 2 MB เท่านั้น',
            'desc.required' => 'ต้องใส่รายละเอียดของโปสเตอร์ ทุกครั้ง',
        ]);

        // $validator = Validator::make(Request::all(), [
        //     //'file' => 'required|mimes:doc,docx,pdf,txt,csv|max:2048',
        //     'cover'  => 'required|mimes:jpg,jpeg|max:2305',
        //     'content' => 'required|mimes:jpg,jpeg,pdf|max:2305',
        // ]);

        // if ($validator->fails()) {
        //     return Redirect::back()->withErrors(['msg' => 'Error File Type', 'sysmsg' => '']);

        //     // return response()->json([
        //     //     'success' => false,
        //     //     'error'=>$validator->errors()
        //     //     ], 401);
        // }

        //Store Cover File
        $cover_store_path = "med_con/cover";
        try {
            $cover_path = (new UploadManager())->store(Request::file('cover'), true, $cover_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ทำการเพิ่มรูปหน้าปกโปสเตอร์ไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        //Store Content File
        $content_store_path = "med_con/content";
        try {
            $content_path = (new UploadManager())->store(Request::file('content'), true, $content_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
        } catch (\Exception  $e) {
            Storage::delete($cover_path);
            return Redirect::back()->withErrors(['msg' => 'ทำการเพิ่มไฟล์เนื้อหาโปสเตอร์ไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        //Store data into DB
        $poster = new Poster();
        $poster->desc = Request::input('desc');
        $poster->cover = $cover_path;
        $poster->content = $content_path;
        try {
            $poster->save();
        } catch (\Exception  $e) {
            Storage::delete($cover_path);
            Storage::delete($content_path);
            return Redirect::back()->withErrors(['msg' => 'ทำการเพิ่มข้อมูลโปสเตอร์ใหม่ไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Insert เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Poster Management (จัดการโปสเตอร์)',
            'insert',
            'มีการเพิ่มข้อมูลโปสเตอร์ใหม่ เรื่อง => '.Request::input('desc'),
            'info'
        );

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
            $status = $Poster->status ? 'เปิดแสดงผล' : 'ปิดแสดงผล';
            $desc = $Poster->desc;
            $Poster->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลโปสเตอร์ไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update สถานะเรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Poster Management (จัดการโปสเตอร์)',
            'update',
            'มีการเปลี่ยนการแสดงผลโปสเตอร์ เรื่อง => '.$desc.' เป็น '.$status,
            'info'
        );

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
        $desc = $Poster->desc;
        $cover_file = $Poster->cover;
        $content_file = $Poster->content;

        // ทำการลบข้อมูล poster ใน DB ก่อน เพราะถ้าลบรูปไปแล้ว แต่ลบ DB ไม่ได้จะทำให้เปิดดูข้อมูลไม่ได้ เพราะหารูปไม่เจอ
        try {
            Poster::whereId($Poster->id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูลโปสเตอร์ได้ เนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Delete เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Poster Management (จัดการโปสเตอร์)',
            'delete',
            'มีการลบข้อมูลโปสเตอร์ เรื่อง => '.$desc,
            'info'
        );


        try {
            // ลบรูปปกของ poster
            if (! is_null($cover_file)) {
                Storage::delete($cover_file);
            }

            // ลบไฟล์เนื้อหาของ poster
            if (! is_null($content_file)) {
                Storage::delete($content_file);
            }
        } catch (\Exception  $e) {
            logger("กรุณาลบรูปปกโปสเตอร์ ".$cover_file." อีกครั้ง เนื่องจากได้มีการลบข้อมูล db ไปแล้วแต่ไม่สามารถลบรูปปกได้");
            logger("กรุณาลบไฟล์เนื้อหาโปสเตอร์ ".$content_file." อีกครั้ง เนื่องจากได้มีการลบข้อมูล db ไปแล้วแต่ไม่สามารถลบไฟล์เนื้อหาได้");
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปปก หรือ ไฟล์เนื้อหา ของโปสเตอร์ได้ เนื่องจาก '.$e->getMessage()]);
        }

        return Redirect::route('admin.poster');
    }
}
