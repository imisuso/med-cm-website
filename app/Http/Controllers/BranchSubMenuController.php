<?php

namespace App\Http\Controllers;

use App\Models\BranchMainMenu;
use App\Models\BranchSubMenu;
use App\Models\Division;
use Illuminate\Support\Facades\Redirect;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class BranchSubMenuController extends Controller
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
    public function show($slug)
    {
        $branch = Division::where('slug', $slug)->first();
        $main_menu = BranchMainMenu::where('division_id', $branch->division_id)->get();
        $sub_menu = BranchSubMenu::where('division_id', $branch->division_id)->get();
    
        return Inertia::render('BranchDetails', [
                                'branch' => $branch,
                                'branch_main_menu' => $main_menu,
                                'branch_sub_menu' => $sub_menu
                            ]);
    }

    public function listSubMenuByDivision($division_id)
    {
        //sleep(2);
        return BranchSubMenu::where('division_id', $division_id)
                ->orderBy('main_header_id', 'asc')
                ->orderBy('menu_order_id', 'asc')->get();
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
    public function update(BranchSubMenu $BranchSubMenu)
    {
        $division_id = $BranchSubMenu->division_id;
        try {
            $BranchSubMenu->detail_delta = Request::input('detail_delta');
            $BranchSubMenu->detail_html = Request::input('detail_html');
            $BranchSubMenu->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'จัดเก็บข้อมูลไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }
        
        return Redirect::route('admin.branch_template_editor')->with('division_id', $division_id);
    }

    public function changeStatusMenu(BranchSubMenu $BranchSubMenu)
    {
        // \Log::info($BranchMainMenu);
        $division_id = $BranchSubMenu->division_id;
        try {
            $BranchSubMenu->status = ! $BranchSubMenu->status;
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
