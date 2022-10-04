<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::with('abilities')->paginate(10);

        return Inertia::render('Admin/Role/Index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $abilities = Ability::select('id', 'label', 'name')->get();
        $action = "insert";
        return Inertia::render('Admin/Role/DataForm', compact('abilities', 'action'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $role_name = request()->input('role_name');
        $role_label = request()->input('role_label');
        $abilities = request()->input('abilities');

        logger($role_name);
        logger($role_label);
        logger($abilities);

//        try {
//            $role = Role::create([
//                'name' => $role_name,
//                'label' => $role_label,
//            ]);
//
//            foreach ($abilities as $ability) {
//                $role->allowTo($ability);
//            }
//
//        } catch (\Exception  $e) {
//            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่ม Role ได้เนื่องจาก ' .$e->getMessage()]);
//        }

        return Redirect::route('admin.role.index');
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
    public function update(Request $request, $id)
    {
        //
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
