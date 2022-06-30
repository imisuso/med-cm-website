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

        $division_id = (int) Request::input('division_id');
        $type = Request::input('type');
        $name_th = Request::input('name_th');
        $name_en = Request::input('name_en');

        if (Division::where('division_id', $division_id)->first()) {
            return Redirect::back()->withErrors(['msg' => 'Error', 'sysmsg' => 'ไม่สามารถเพิ่ม สาขา/หน่วย ได้เนื่องจากพบหมายเลข ' .$division_id.' นี้ถูกใช้งานในระบบแล้ว']);
        }

        try {
            if (Request::hasFile('image')) {
                $storePath = 'images/divisions';
                $imgDB = (new UploadManager)->store(Request::file('image'), true, $storePath); // แบบใหม่ที่จะทำรองรับ s3 ด้วย
            } else {
                $imgDB = "";
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มรูปภาพ สาขา/หน่วย ได้', 'sysmsg' => $e->getMessage()]);
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

            // ลบรูปที่เพิ่ง upload ถ้า insert ลงฐานข้อมูลไม่สำเร็จ
            Storage::delete($imgDB);
            return Redirect::back()->withErrors(['msg' => 'fail', 'sysmsg' => $e->getMessage()]);
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
    public function edit(Division $Division)
    {
        return Inertia::render('Admin/Division/DataForm', ['action' => 'edit', 'division' => $Division]);
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
                    $imgDB = "";
                }
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขรูปภาพบุคคลากรได้', 'sysmsg' => $e->getMessage()]);
        }

        try {
            $division = Division::find((int)$id);

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
            // ลบรูปใหม่ที่เพิ่ง upload ถ้า update ฐานข้อมูลไม่สำเร็จ
            Storage::delete($imgDB);
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูล สาขา/หน่วยงานได้', 'sysmsg' => $e->getMessage()]);
        }
        
        // ลบรูปเก่าหลังจาก update ข้อมูลทุกอย่างเรียบร้อยแล้ว
        if ($has_update_image) {
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
        //\Log::info($data['image']);
        try {
            Division::whereId((int)$id)->delete();
            Storage::delete($data['image']);
        } catch (\Exception  $e) {
            //\Log::info($e->getMessage());
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถลบข้อมูล สาขา/หน่วยงานได้', 'sysmsg' => $e->getMessage()]);
        }
        
        return Redirect::route('admin.division');
    }

    public function listBranchOnly()
    {
        return Division::where('division_id', '<', 19)->orderBy('division_id', 'asc')->get();
    }

    public function listAll()
    {
        return Division::orderBy('division_id', 'asc')->get();
    }
}
