<?php

namespace App\Http\Controllers;

use App\Managers\LogManager;
use App\Models\Person;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('person')->paginate(7);

        return Inertia::render('Admin/User/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::pluck('sap_id')->all();
        return Inertia::render('Admin/User/DataForm', [
                'person' => Person::with('division')
                    ->when(Request::input('term'), function ($query_1) use ($users) {
                        $term = Request::input('term');
                        $query_1->whereNotIn('sap_id', $users)
                            ->where(function ($query_2) use ($term) {
                                $query_2->where('fname_th', 'like', "%$term%")
                                ->orWhere('lname_th', 'like', "%$term%");
                            });
                    })
                    ->orderBy('division_id', 'asc')
                    ->orderBy('type')
                    ->orderBy('profiles->leader', 'desc')
                    ->orderBy('display_order', 'asc')
                    ->orderBy('fname_th', 'asc')
                    ->get(),
                'roles' => Role::all()
            ]);
        //return Inertia::render('Admin/UserAbilityRole/DataForm', compact('person'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Person $person)
    {
//        logger($person->sap_id);
//        logger(Request::input('role_name'));

        $role_name = Request::input('role_name');
        $status = Request::input('status');
        $password = Hash::make('11111111');

        try {
            $user = User::create([
                'name' => $person->slug,
                'email' => 'add_by_webui@mahidol.ac.th',
                'password' => $password,
                'sap_id' => $person->sap_id,
                'status' => $status
            ]);

            $user->assignRole($role_name);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มผู้ใช้งานระบบได้เนื่องจาก ' .$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Insert เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'User Management (จัดการผู้ใช้งาน)',
            'insert',
            'มีการเพิ่มข้อมูลผู้ใช้งานระบบใหม่ sap_id : '.$person->sap_id,
            'info'
        );

        return Redirect::route('admin.user.index');
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
    public function edit(User $user)
    {
        // logger($user);
        $person = Person::with('division')
                    ->where('sap_id', $user->sap_id)
                    ->get();

        return Inertia::render('Admin/User/DataForm', [
            'action' => 'edit',
            'user' => $user,
            'person' => $person,
            'roles' => Role::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user)
    {
        $role_name = Request::input('role_name');
        $status = Request::input('status');

        try {
            // ถ้า role ที่ update มาใหม่ ไม่ใช่ role เดิม ให้ทำการ remove role เก่าออกก่อน แล้วถึง assign role ใหม่ให้
            if( ! $user->getUserRolesAttribute()->contains($role_name)) {
                $user->revokeRole();
                $user->assignRole($role_name);
            }

            $user->status = $status;
            $user->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถแก้ไขผู้ใช้งานระบบได้เนื่องจาก ' .$e->getMessage()]);
        }

        // เก็บ Log หลังจาก Update เรียบร้อยแล้ว
        $resp = (new LogManager)->store(
            Auth::user()->sap_id,
            'User Management (จัดการผู้ใช้งาน)',
            'update',
            'มีการแก้ไขข้อมูลผู้ใช้งานระบบ sap_id : '.$user->sap_id,
            'info'
        );

        return Redirect::route('admin.user.index');
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
