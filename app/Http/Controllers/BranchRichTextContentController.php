<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Models\BranchSubMenu;
use App\Models\Division;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class BranchRichTextContentController extends Controller
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
    public function store(Request $request)
    {
        //
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
        return Inertia::render('Admin/BranchTemplate/RichTextContentEditor', ['sub_header' => $sub_header]);
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
        $division_id = Request::input('division_id');

        $division_data = Division::select('name_th')
               ->where('division_id', $division_id)
               ->first();

        try {
            $BranchSubMenu->detail_delta = Request::input('detail_delta');
            $BranchSubMenu->detail_html = Request::input('detail_html');
            $BranchSubMenu->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'แก้ไขข้อมูลเนื้อหาสาขาไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Branch Content Management (จัดการเนื้อหาสาขา)',
            'update',
            'มีการแก้ไขข้อมูลเนื้อหาสาขา => '.$division_data->name_th.' | หัวข้อ => main('.$BranchSubMenu->main_header_id.') : '.$BranchSubMenu->sub_header_name_th,
            'info'
        );

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
}
