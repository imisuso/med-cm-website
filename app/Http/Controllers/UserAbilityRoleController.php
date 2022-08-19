<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UserAbilityRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('person')->paginate(7);

        return Inertia::render('Admin/UserAbilityRole/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::pluck('sap_id')->all();
        return Inertia::render('Admin/UserAbilityRole/DataForm', [
                'person' => Person::with('division')
                    ->when(Request::input('term'), function ($query_1) use ($users) {
                        $term = Request::input('term');
                        $query_1->whereNotIn('sap_id', $users)
                            ->where( function($query_2) use ($term) {
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
        $password = Hash::make('11111111');

        try {
            $user = User::create([
                'name' => $person->slug,
                'email' => 'add_by_webui@mahidol.ac.th',
                'password' => $password,
                'sap_id' => $person->sap_id
            ]);

            $user->assignRole($role_name);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'ไม่สามารถเพิ่มผู้ใช้งานระบบได้เนื่องจาก ' .$e->getMessage()]);
        }


        return Redirect::route('admin.user_ability_role.index');
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
