<?php

namespace App\Http\Controllers;

use App\Managers\UploadManager;
use App\Models\Gallery;
use Aws\Multipart\UploadState;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

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
        $image_path = "public/images/gallery/".$event_date."/photo";

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
                                    'desc' => $Gallery->desc,
                                    'event_date' => $event_date,
                                    'images' => $file_storage,
                                    'limit' => $limit
                                ]
        );
    }

    public function uploadImageToGallery($event_date)
    {
        //logger(Request::all());
        // logger($event_date);
        $store_path = "images/gallery/".$event_date."/photo";
        
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
            return Redirect::back()->withErrors(['msg' => 'พบปัญหาของไฟล์ที่ไม่ใช่ .JPG หรือมีขนาดเกิน 2 MB', 'sysmsg' => '']);
        }
        
        foreach (Request::file('imageFiles') as $image) {
            //logger($image->getClientOriginalName());
            try {
                $file_path = (new UploadManager)->store($image, true, $store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } catch (\Exception  $e) {
                //logger($e->getMessage());
                return Redirect::back()->withErrors(['msg' => 'อัพโหลดรูปไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
            }
            //$file_path = (new UploadManager)->store($image, true, $store_path ); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
        }

        return Redirect::route('admin.manage_gallery', Request::input('id'));
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

        //Store Cover File
        $event_date = date("Ymd", strtotime(Request::input('event_date')));
        $cover_store_path = "images/gallery/".$event_date;
        try {
            $cover_path = (new UploadManager)->store(Request::file('cover'), true, $cover_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เพิ่มรูปหน้าปกแกลลอรี่รูปกิจกรรมไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        //Store data into DB
        $gallery = new Gallery;
        $gallery->desc = Request::input('desc');
        $gallery->cover = $cover_path;
        $gallery->event_date = Request::input('event_date');
        try {
            $gallery->save();
        } catch (\Exception  $e) {
            Storage::delete($cover_path);
            return Redirect::back()->withErrors(['msg' => 'เพิ่มแกลลอรี่รูปกิจกรรมไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        return Redirect::route('admin.gallery');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($event_date)
    {
        //logger($event_date);
        $image_path = "public/images/gallery/".$event_date."/photo";

        $files_path = Storage::files($image_path);
        $file_storage = [];

        if (count($files_path) > 0) {
            foreach ($files_path as $file) {
                $file_storage[] = Storage::url($file);
            }
        }
        return Inertia::render(
            'Gallery',
            ['images' => $file_storage]
        );
    }

    public function showListEnabledGallery()
    {
        $limit = env('GALLERY_LIMIT', 8);

        $galleries = Gallery::whereStatus(true)->orderBy('event_date', 'desc')->take($limit)->get();
        return $galleries;
    }

    public function checkGalleryEmpty($event_date)
    {
        $image_path = "public/images/gallery/".$event_date."/photo";

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
        $change_event_date = 0;
        $old_cover = $Gallery->cover;

        // ตรวจสอบว่ามีการเปลี่ยนวันที่ของรูปกิจกรรมหรือไม่
        $db_event_date = date("Ymd", strtotime($Gallery->event_date));
        $form_event_date = date("Ymd", strtotime(Request::input('event_date')));
        if ($form_event_date !== $db_event_date) {
            $change_event_date = 1;
            // $old_event_date = date("Ymd", strtotime($Gallery->event_date));
            $old_dir = "public/images/gallery/".$db_event_date;
            try {
                Storage::deleteDirectory($old_dir);
                $Gallery->cover = '';
                $Gallery->event_date = Request::input('event_date');
            } catch (\Exception  $e) {
                return Redirect::back()->withErrors(['msg' => 'เปลี่ยนวันที่ของรูปกิจกรรมไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
            }
        }

        // ตรวจสอบว่ามีการเปลี่ยนรูปหน้าปกของแกลลอรี่หรือไม่
        if (Request::hasFile('cover')) {

            //Store Cover File
            $event_date = $form_event_date;
            $cover_store_path = "images/gallery/".$event_date;
            $cover_path = (new UploadManager)->store(Request::file('cover'), true, $cover_store_path); // แบบใหม่ที่จะทำรองรับ s3 ด้วย

            //Store data into DB
            $Gallery->cover = $cover_path;

            if (! $change_event_date) { // ถ้าไม่ได้เปลี่ยน event_date และมีการเปลี่ยนรูปหน้าปกกิจกรรม ให้ลบรูปเก่าทิ้งด้วย
                Storage::delete($old_cover);
            }
        }

        try {
            $Gallery->desc = Request::input('desc');
            $Gallery->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'แก้ไขข้อมูลแกลลอรี่ลงฐานข้อมูลไม่สำเร็จ เนื่องจาก '.$e->getMessage()]);
        }

        return Redirect::route('admin.gallery');
    }

    public function updateGalleryDisplayStatus(Gallery $Gallery)
    {
        try {
            $Gallery->status = ! $Gallery->status;
            $Gallery->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลแกลลอรี่ ไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }
        
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
        // ลบรูปปก และ รูปทั้งหมดภายในของ gallery แต่จะมีการ verify มาก่อนแล้วว่าจะให้ลบรูปใน gallery ก่อนถ้ามีรูปใน gallery แล้ว
        try {
            $gallery_dir = "public/images/gallery/".date("Ymd", strtotime($Gallery->event_date));
            Storage::deleteDirectory($gallery_dir);
            // if (! is_null($Gallery->cover)) {
            //     Storage::delete($Gallery->cover);
            // }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปทั้งหมดของแกลลอรี่ได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            Gallery::whereId($Gallery->id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูลแกลลอรี่ได้', 'sysmsg' => $e->getMessage()]);
        }

        return Redirect::route('admin.gallery');
    }

    public function destroyGalleryImage()
    {
        //logger(Request::all());

        try {
            Storage::delete(Request::input('file_path'));
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปจากแกลลอรี่ได้', 'sysmsg' => $e->getMessage()]);
        }
        // ลบรูปปกของ gallery
        // try {
        //     if( ! is_null($Gallery->cover) ) {
        //         Storage::delete($Gallery->cover);
        //     }
        // } catch(\Exception  $e) {
        //     return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบรูปปกแกลลอรี่ได้', 'sysmsg' => $e->getMessage()]);
        // }

        return Redirect::route('admin.manage_gallery', Request::input('id'));
    }
}
