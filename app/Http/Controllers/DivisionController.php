<?php

namespace App\Http\Controllers;

use App\Managers\UploadManager;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use App\Models\Division;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DivisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Division/Index', [
            'divisions' => Division::query()
                ->when(Request::input('search'), function ($query, $search) {
                    $query->where('name_th', 'like', "%{$search}%");
                })
                ->orderBy('division_id', 'asc')
                ->paginate(5)
                ->withQueryString(),
                // ->through(fn ($item) => [
                //     'id' => $item->id,
                //     'title' => $item->title,
                //     'link' => $item->link,
                //     'order_number' => $item->order_number,
                //     'status' => $item->status
                // ]),
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
        return Inertia::render('Admin/Division/DataForm');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;
        $has_image = false;

        request()->validate([
            'division_id' => ['required', 'integer', 'min:1'],
            'name_th' => ['required'],
            'type' => ['required']
        ], [
            'division_id.required' => 'ต้องใส่หมายเลข สาขา/หน่วยงาน ทุกครั้ง',
            'division_id.min' => 'ต้องใส่หมายเลข สาขา/หน่วยงาน 1 เป็นอย่างน้อย และต้องไม่ซ้ำกับที่มีใช้อยู่ในระบบ',
            'name_th.required' => 'ต้องใส่ชื่อภาษาไทยของ สาขา/หน่วยงาน ทุกครั้ง',
            'type.required' => 'ต้องระบุประเภทของ สาขา/หน่วยงาน ทุกครั้ง',
        ]);

        $division_id = (int) Request::input('division_id');
        $type = Request::input('type');
        $name_th = Request::input('name_th');
        $name_en = Request::input('name_en');

        if (Division::where('division_id', $division_id)->first()) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่ม สาขา/หน่วยงาน ได้เนื่องจากพบหมายเลข ' .$division_id.' นี้ถูกใช้งานในระบบแล้ว']);
        }

        try {
            if (Request::hasFile('image')) {
                $has_image = true;
                $storePath = 'images/divisions';
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                $imgDB = null;
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มรูปภาพ สาขา/หน่วยงาน ได้เนื่องจาก ' . $e->getMessage()]);
        }

        try {
            Division::create([
                'image'=>$imgDB,
                'division_id'=>$division_id,
                'type'=>$type,
                'name_th'=>$name_th,
                'name_en'=>$name_en,
                'user_previous_act'=>$sap_id,
                'user_last_act'=>$sap_id
            ]);
        } catch (\Exception  $e) {

            // หากมีรูปที่ทำการ upload มาให้ลบรูปที่เพิ่ง upload ถ้า insert ลงฐานข้อมูลไม่สำเร็จ
            if ($has_image) {
                Storage::delete($imgDB);
            }
            return Redirect::back()->withErrors(['msg' => 'เนื่องจาก ' . $e->getMessage()]);
        }
        
        return Redirect::route('admin.division');
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
    public function edit(Division $division)
    {
        return Inertia::render('Admin/Division/DataForm', ['action' => 'edit', 'division' => $division]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Division $division)
    {
        $user = Auth::user();
        $sap_id = $user->sap_id;

        $division_id = (int) Request::input('division_id');
        $type = Request::input('type');
        $name_th = Request::input('name_th');
        $name_en = Request::input('name_en');
        $has_update_image = false;
        //\Log::info(Request::all());

        try {
            if (Request::hasFile('image')) {
                $has_update_image = true;
                $oldimage = Request::input('oldimage');

                $storePath = 'images/divisions';
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                if (Request::input('oldimage')) {
                    $imgDB = Request::input('oldimage');
                } else {
                    $imgDB = null;
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขรูปภาพ สาขา/หน่วยงาน ได้เนื่องจาก ' . $e->getMessage()]);
        }

        // ถ้า division_id ไม่เท่ากับเลขเดิม และ พบเลขนี้ในระบบแล้ว ให้ return error กลับไป
        if (($division_id !== $division->division_id) && Division::where('division_id', $division_id)->first()) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูล สาขา/หน่วยงาน ได้เนื่องจากพบหมายเลข ' .$division_id.' นี้ถูกใช้งานในระบบแล้ว']);
        }

        try {
            $division->image = $imgDB;
            $division->division_id = $division_id;
            $division->type = $type;
            $division->name_th = $name_th;
            $division->name_en = $name_en;
            $division->user_previous_act = $division->user_last_act;
            $division->user_last_act = $sap_id;

            $division->save();
            // Division::whereId((int)$id)
            //         ->update([
            //             'division_id'=>$division_id,
            //             'type'=>$type,
            //             'name_th'=>$name_th,
            //             'name_en'=>$name_en,
            //             'image'=>$imgDB,
            //             'user_previous_act'=>$user_previous_act,
            //             'user_last_act'=>$user_last_act
            //         ]);
        } catch (\Exception  $e) {
            // ถ้ามีการเปลี่ยนรูปใหม่ ให้ลบรูปใหม่ที่เพิ่ง upload ถ้า update ฐานข้อมูลไม่สำเร็จ
            if ($has_update_image) {
                Storage::delete($imgDB);
            }
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูล สาขา/หน่วยงาน ได้เนื่องจาก '. $e->getMessage()]);
        }
        
        // หากมีการ update รูป และเคยมีรูปเก่าแล้ว จึงจะทำการลบรูปเก่าหลังจาก update ข้อมูลทุกอย่างเรียบร้อยแล้ว
        if ($has_update_image && $oldimage) {
            Storage::delete($oldimage);
        }
        return Redirect::route('admin.division');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Division::select('image')->whereId((int)$id)->first();
        try {
            Division::whereId((int)$id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูล สาขา/หน่วยงาน ได้เนื่องจาก '. $e->getMessage()]);
        }
        
        // ถ้าเคยมีการเก็บรูปมาแล้ว
        if ($data['image']) {
            Storage::delete($data['image']);
        }
        return Redirect::route('admin.division');
    }

    public function listBranchOnly()
    {
        return Division::where('type', 'b')->orderBy('division_id', 'asc')->get();
    }

    public function listAll()
    {
        return Division::orderBy('division_id', 'asc')->get();
    }
}
