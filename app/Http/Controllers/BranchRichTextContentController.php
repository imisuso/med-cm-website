<?php

namespace App\Http\Controllers;

use App\Models\BranchSubMenu;
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

        try {
            $BranchSubMenu->detail_delta = Request::input('detail_delta');
            $BranchSubMenu->detail_html = Request::input('detail_html');
            $BranchSubMenu->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลเมนูไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

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
