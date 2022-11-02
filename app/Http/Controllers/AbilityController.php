<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Models\Ability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AbilityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $abilities = Ability::all();
        return Inertia::render('Admin/Ability/Index', compact('abilities'));
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
    public function update(Ability $ability)
    {
        try {
            $ability->label = request()->input('ability_label');

            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old_ability_label = $ability->getOriginal('label');

            $ability->save();
            if( strcmp($old_ability_label, $ability->label) !== 0 ) {
                $log_message = "มีการเปลี่ยนรายละเอียด Ability จากเดิม : [ {$old_ability_label} ] เป็น : [ {$ability->label} ]";
            } else {
                $log_message = "มีการแก้ไขแต่ไม่มีการเปลี่ยนรายละเอียด Ability";
            }
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขข้อมูล Ability ได้เนื่องจาก ' .$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'Ability Management (จัดการ Ability)',
            'update',
            "{$log_message}",
            'info'
        );

        return redirect()->route('admin.ability.index');
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
