<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Managers\UploadManager;

use App\Models\Gallery;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index_admin()
    {
        return Inertia::render('Admin/Gallery/Index', [
            'galleries' => Gallery::query()
                ->when(Request::input('search'), function ($query, $search) {
                    $query->where('desc', 'like', "%{$search}%");
                })
                ->orderBy('event_date', 'desc')
                ->paginate(5)
                ->withQueryString()
                ->through(fn ($gallery) => [
                    'id' => $gallery->id,
                    'slug' => $gallery->slug,
                    'cover' => $gallery->cover,
                    'cover_url' => $gallery->cover_url,
                    'desc' => $gallery->desc,
                    'event_date' => $gallery->event_date,
                    'status' => $gallery->status,
                    'created_at' => $gallery->created_at
                ]),
            'filters' => Request::only(['search'])
        ]);

        // $galleries = Gallery::all();
        // return Inertia::render('Admin/Gallery', compact('galleries'));
    }

    public function index_front()
    {
        // return Inertia::render('Gallery', [ 'announces' => $announces ]);
        //\Log::info(Request::all());
        return Inertia::render('Gallery');
    }

    public function manageGallery(Gallery $Gallery)
    {
        $limit = (int)env('PHOTO_LIMIT_PER_GALLERY', 15);
        //logger($Gallery);
        $event_date = date("Ymd", strtotime($Gallery->event_date));

        //$image_path = "public/images/gallery/".$event_date."/photo";
        $image_path = "public/images/gallery/".$Gallery->slug."/photo";

        $files_path = Storage::files($image_path);
        $file_storage = [];

        if (count($files_path) > 0) {
            foreach ($files_path as $file) {
                $file_storage[] = (object) ['image_url' => Storage::url($file), 'image_path' => $file];
            }
        }
        return Inertia::render(
            'Admin/Gallery/ManageGallery',
            [
                                    'id' => $Gallery->id,
                                    'slug' => $Gallery->slug,
                                    'desc' => $Gallery->desc,
                                    'event_date' => $event_date,
                                    'images' => $file_storage,
                                    'limit' => $limit
                                ]
        );
    }

    // public function uploadImageToGallery($event_date)
    public function uploadImageToGallery(Gallery $Gallery)
    {
        // $store_path = "images/gallery/".$event_date."/photo";
        $store_path = "images/gallery/".$Gallery->slug."/photo";

        // $messages = [
        //     'same' => 'The :attribute and :other must match.',
        //     'size' => 'The :attribute must be exactly :size.',
        //     'between' => 'The :attribute value :input is not between :min - :max.',
        //     'in' => 'The :attribute must be one of the following types: :values',
        // ];

        // $validator = Validator::make(Request::all(),
        //                 [   'imageFiles.*'  => 'required|mimes:jpg,jpeg|max:2305' ],
        //                 [
        //                     'imageFiles.*.required'=> 'ต้องการไฟล์รูปในการ upload', // custom message
        //                     'imageFiles.*.mimes:jpg,jpeg'=> 'ไม่ใช่ไฟล์รูปประเภท .JPG', // custom message
        //                     'imageFiles.*.max:2305'=> 'ขนาดไฟล์เกิน 2 MB',
        //                 ]);

        $validator = Validator::make(
            Request::all(),
            [   'imageFiles.*'  => 'required|mimes:jpg,jpeg|max:2305' ],
        );

        if ($validator->fails()) {
            //logger($validator->errors());
            return Redirect::back()->withErrors(['msg' => 'พบปัญหาของไฟล์ที่ไม่ใช่ .JPG หรือมีขนาดเกิน 2 MB']);
        }

        foreach (Request::file('imageFiles') as $image) {
            //logger($image->getClientOriginalName());
            try {
                $file_path = (new UploadManager())->store($image, true, $store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } catch (\Exception  $e) {
                return Redirect::back()->withErrors(['msg' => 'อัพโหลดรูปไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
            }
        }

        // เก็บ Log หลังจาก Upload รูปเรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Gallery Management (จัดการแกลลอรี่รูปกิจกรรม)',
            'upload',
            'มีการเพิ่มรูปลงแกลลอรี่รูปกิจกรรม เรื่อง => '.$Gallery->desc,
            'info'
        );

        return Redirect::route('admin.gallery.manage', Request::input('id'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Gallery/DataForm');
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
            'desc' => ['required'],
        ], [
            'cover.required' => 'ต้องใส่รูปหน้าปก ทุกครั้ง',
            'cover.mimes' => 'ต้องใส่รูปหน้าปกที่เป็น jpg หรือ jpeg เท่านั้น',
            'cover.max' => 'ต้องใส่รูปหน้าปกขนาดไม่เกิน 2 MB เท่านั้น',
            'desc.required' => 'ต้องใส่รายละเอียดแกลลอรี่รูปกิจกรรม ทุกครั้ง',
        ]);

        //Create slug
        $slug = Str::uuid()->toString();

        //Store Cover File
        $cover_store_path = "images/gallery/".$slug;
        try {
            $cover_path = (new UploadManager())->store(Request::file('cover'), true, $cover_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เพิ่มรูปหน้าปกแกลลอรี่รูปกิจกรรมไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        //Store data into DB
        $gallery = new Gallery();
        $gallery->slug = $slug;
        $gallery->desc = Request::input('desc');
        $gallery->cover = $cover_path;
        $gallery->event_date = Request::input('event_date');
        try {
            $gallery->save();
        } catch (\Exception  $e) {
            Storage::delete($cover_path);
            return Redirect::back()->withErrors(['msg' => 'เพิ่มแกลลอรี่รูปกิจกรรมไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }


        // เก็บ Log หลังจาก Insert เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Gallery Management (จัดการแกลลอรี่รูปกิจกรรม)',
            'insert',
            'มีการเพิ่มข้อมูลแกลลอรี่รูปกิจกรรมใหม่ เรื่อง => '.Request::input('desc'),
            'info'
        );

        return Redirect::route('admin.gallery');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Gallery $Gallery)
    //public function show($event_date)
    {
        //logger($Gallery);
        if( ! $Gallery->status ) {
            return Inertia::render('Admin/Errors/NotFound');
        }

        $image_path = "public/images/gallery/".$Gallery->slug."/photo";

        $files_path = Storage::files($image_path);
        $file_storage = [];

        if (count($files_path) > 0) {
            foreach ($files_path as $file) {
                $file_storage[] = Storage::url($file);
            }
        }
        return Inertia::render(
            'Gallery',
            ['images' => $file_storage, 'desc' => $Gallery->desc]
        );
    }

    public function showListEnabledGallery()
    {
        $limit = env('GALLERY_LIMIT', 8);

        $galleries = Gallery::whereStatus(true)->orderBy('event_date', 'desc')->take($limit)->get();
        return $galleries;
    }

    // public function checkGalleryEmpty($event_date)
    public function checkGalleryEmpty($slug)
    {
        $image_path = "public/images/gallery/".$slug."/photo";

        $files_path = Storage::files($image_path);

        //logger(count($files_path));
        return count($files_path);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Gallery $Gallery)
    {
        return Inertia::render('Admin/Gallery/DataForm', ['action' => 'edit', 'gallery' => $Gallery]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Gallery $Gallery)
    {
        $change_cover = 0;
        $old_cover = $Gallery->cover;

        // ตรวจสอบว่ามีการเปลี่ยนรูปหน้าปกของแกลลอรี่หรือไม่
        if (Request::hasFile('cover')) {

            //Store Cover File
            $slug = $Gallery->slug;
            $cover_store_path = "images/gallery/".$slug;
            $cover_path = (new UploadManager())->store(Request::file('cover'), true, $cover_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

            //Store data into DB
            $Gallery->cover = $cover_path;
            $change_cover = 1;
        }

        try {
            $Gallery->event_date = Request::input('event_date');
            $Gallery->desc = Request::input('desc');
            $Gallery->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'แก้ไขข้อมูลแกลลอรี่ลงฐานข้อมูลไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        // ลบรูปหน้าปก ของเก่าออก ถ้ามีการเปลี่ยนรูปหน้าปก ใหม่มา
        if ($change_cover) {
            Storage::delete($old_cover);
        }

        //เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Gallery Management (จัดการแกลลอรี่รูปกิจกรรม)',
            'update',
            'มีการแก้ไขข้อมูลแกลลอรี่รูปกิจกรรม ID => '.$Gallery->id.' | เรื่อง => '.Request::input('desc'),
            'info'
        );

        return Redirect::route('admin.gallery');
    }

    public function updateGalleryDisplayStatus(Gallery $Gallery)
    {
        try {
            $Gallery->status = ! $Gallery->status;
            $status = $Gallery->status ? 'เปิดแสดงผล' : 'ปิดแสดงผล';
            $Gallery->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลแกลลอรี่ ไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Gallery Management (จัดการแกลลอรี่รูปกิจกรรม)',
            'update',
            'มีการเปลี่ยนการแสดงผลแกลลอรี่รูปกิจกรรม เรื่อง => '.$Gallery->desc.' เป็น:'.$status,
            'info'
        );

        return Redirect::route('admin.gallery');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gallery $Gallery)
    {
        $desc = $Gallery->desc;

        // ลบรูปปก และ รูปทั้งหมดภายในของ gallery แต่จะมีการ verify มาก่อนแล้วว่าจะให้ลบรูปใน gallery ก่อนถ้ามีรูปใน gallery แล้ว
        try {
            $gallery_dir = "public/images/gallery/".$Gallery->slug;
            Storage::deleteDirectory($gallery_dir);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปทั้งหมดของแกลลอรี่ได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            Gallery::whereId($Gallery->id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูลแกลลอรี่ได้', 'sysmsg' => $e->getMessage()]);
        }

        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Gallery Management (จัดการแกลลอรี่รูปกิจกรรม)',
            'delete',
            'มีการลบแกลลอรี่รูปกิจกรรม เรื่อง => '.$desc,
            'info'
        );

        return Redirect::route('admin.gallery');
    }

    public function destroyGalleryImage()
    {
        //logger(Request::all());

        try {
            Storage::delete(Request::input('file_path'));
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปจากแกลลอรี่ได้ เนื่องจาก '.$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Upload รูปเรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Gallery Management (จัดการแกลลอรี่รูปกิจกรรม)',
            'upload',
            'มีการลบรูปออกจากแกลลอรี่รูปกิจกรรม เรื่อง => '.Request::input('desc'),
            'info'
        );

        return Redirect::route('admin.gallery.manage', Request::input('id'));
    }
}
