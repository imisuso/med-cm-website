<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Models\BranchMainMenu;
use App\Models\BranchSubMenu;
use App\Models\Division;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class BranchMainMenuTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        if (Session::has('division_id')) {
            $division_id = (int)Session::pull('division_id');
        } else {
            $division_id = $user->person->division_id;
        }

        $main_menu = BranchMainMenu::where('division_id', $division_id)->orderBy('menu_order_id', 'asc')->get();

        $sub_menu = BranchSubMenu::where('division_id', $division_id)->orderBy('menu_order_id', 'asc')->get();

        return Inertia::render('Admin/BranchTemplate/BranchTemplateEditor', ['division_id' => $division_id, 'branch_main_menu' => $main_menu, 'branch_sub_menu' => $sub_menu]);
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
    public function show($division_id)
    {
        return Redirect::route('admin.branch_template_editor')->with('division_id', $division_id);
    }

    public function listMainMenuByDivision($division_id)
    {
        return BranchMainMenu::where('division_id', $division_id)->orderBy('menu_order_id', 'asc')->get();
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

    public function changeStatusMenu(BranchMainMenu $BranchMainMenu)
    {
        //\Log::channel('daily')->info($BranchMainMenu);
        // \Log::info( ! $BranchMainMenu->status);
        $division_data = Division::select('name_th')
               ->where('division_id', $BranchMainMenu->division_id)
               ->first();

        try {
            $textStatus =  $BranchMainMenu->status ? 'ปิด' : 'เปิด';
            $BranchMainMenu->status = ! $BranchMainMenu->status;
            $BranchMainMenu->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เปลี่ยนสถานะการแสดงผลเมนูไม่สำเร็จ', 'sysmsg' => $e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager())->store(
            Auth::user()->sap_id,
            'Branch Content Management (จัดการเนื้อหาสาขา)',
            'update',
            'มีการเปลี่ยนสถานะการแสดงผลข้อมูลสาขา => '.$division_data->name_th.' | หัวข้อ => '.$BranchMainMenu->main_header_name_th.' | เป็น => '.$textStatus,
            'info'
        );

        return Redirect::route('admin.branch_template_editor');
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
