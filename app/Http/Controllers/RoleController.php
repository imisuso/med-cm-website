<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Models\Ability;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
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
        request()->validate([
            'role_name' => ['required', 'regex:/^[a-z]+[_a-z0-9]*$/', 'max:20'],
            'role_label' => ['required', 'max:255'],
            'abilities' => [function ($attribute, $value, $fail) {
                $hasBasicAbility = false;
                foreach ($value as $ability) {
                    $hasBasicAbility = strcmp($ability['name'], 'goto_admin_panel') === 0 ? true : $hasBasicAbility;
                }
                if(!$hasBasicAbility) $fail('ต้องมี Role ชื่อ goto_admin_panel ในรายการเสมอ');
            }],
        ], [
            'role_name.required' => 'ต้องใส่ขื่อ Role ทุกครั้ง',
            'role_name.regex' => 'ขื่อ Role ต้องขึ้นต้นด้วยตัวอักษร ภาษาอังกฤษตัวพิมพ์เล็กเท่านั้น และใส่ได้เฉพาะภาษาอังกฤษตัวพิมพ์เล็ก หรือเครื่องหมาย _ หรือตัวเลขได้เท่านั้น เช่น hr หรือ hr01 หรือ hr_admin เป็นต้น',
            'role_name.max' => 'ต้องใส่ขื่อ Role ไม่เกิน 20 ตัวอักษรเท่านั้น',
            'role_label.required' => 'ต้องใส่คำอธิบายเกี่ยวกับหน้าที่ของ Role ทุกครั้ง',
            'role_label.max' => 'ต้องใส่คำอธิบายเกี่ยวกับหน้าที่ของ Role ไม่เกิน 255 ตัวอักษรเท่านั้น',

        ]);

        $role_name = trim(request()->input('role_name'));
        $role_label = request()->input('role_label');
        $abilities = request()->input('abilities');

        if( Role::whereName($role_name)->first() ) {
            return Redirect::back()->withErrors(['msg' => "ไม่สามารถเพิ่ม Role ที่ชื่อ {$role_name} ได้เนื่องจากพบชื่อนี้ในระบบฐานข้อมูลแล้ว"]);
        }

        try {
            $role = Role::create([
                'name' => $role_name,
                'label' => $role_label,
            ]);

            foreach ($abilities as $ability) {
                $role->allowTo($ability['name']);
            }

        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => "ไม่สามารถเพิ่ม Role ได้เนื่องจาก {$e->getMessage()}"]);
        }

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
    public function destroy(Role $role)
    {
        if( count($role->users) ) {
            return Redirect::back()->withErrors(['msg' => "ไม่สามารถลบ Role ออกจากระบบได้เนื่องจากพบว่ายังคงมีการกำหนด Role นี้ให้ผู้ใช้งานในระบบใช้งานอยู่"]);
        }
        try {
            $role->revokeAbility();
            Role::whereId($role->id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => "ไม่สามารถลบ Role ออกจากระบบได้เนื่องจาก {$e->getMessage()}"]);
        }

        // เก็บ Log หลังจาก Delete เรียบร้อยแล้ว
//        $resp = (new LogManager)->store(
//            Auth::user()->sap_id,
//            'Role Management (จัดการ Role)',
//            'delete',
//            "มีการลบข้อมูล Role ออกจากระบบ name : {$role->name}",
//            'info'
//        );

        return Redirect::route('admin.role.index');
    }
}
