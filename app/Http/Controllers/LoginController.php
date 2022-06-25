<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use App\Contracts\AuthUserAPI;
use App\Managers\LogManager;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('LoginForm');
    }

    public function login_authen(Request $request, AuthUserAPI $api)
    {
        $getUserFromAPI = $api->authenticate($request->username, $request->password);
        //logger($getUserFromAPI);

        if (! $getUserFromAPI['found']) {
            $resp = (new LogManager)->store(
                '00000000', // ไม่พบ user ใน AD หรือ password ไม่ถูกต้อง
                'login',
                'login',
                'Attemp login with username:'.$request->username,
                'security'
            );

            return Redirect::back()->withErrors(['msg' => $getUserFromAPI['reply_text'], 'sysmsg' => '']);
        }

        $user = User::where('sap_id', $getUserFromAPI['org_id'])->first();

        if ($user) {
            Auth::login($user);
            $resp = (new LogManager)->store(
                $getUserFromAPI['org_id'],
                'login',
                'login',
                'This user login to website',
                'security'
            );
        } else {
            $resp = (new LogManager)->store(
                $getUserFromAPI['org_id'],
                'login',
                'login',
                'This user dose not permission to login for manage website',
                'security'
            );
        }

        return redirect()->route('admin.index');
        //return $user;
    }

    public function loginAs($sap_id)
    {
        //\Log::info("login-as controller");
        //\Log::info($name);
        
        // if( $role === 'super_admin' ) {
        //     $user = 'super_admin@med.si';
        // } else if( $role === 'general_admin' ) {
        //     $user = 'general_admin@med.si';
        // } else if( $role === 'division_admin' ) {
        //     $user = 'division_admin@med.si';
        // } else if( $role === 'user') {
        //     $user = 'user@med.si';
        // } else {
        //     $user = 'guest@med.si';
        // }

        $user = User::where('sap_id', $sap_id)->first();

        if ($user) {
            Auth::login($user);
            // \Log::info("Login Controller");
            // \Log::info(Auth::user());
        }

        return redirect()->route('admin.index');
        //return Inertia::render('Admin/Index');
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
    public function destroy(Request $request)
    {
        if ($request->user()) {
            $resp = (new LogManager)->store(
                $request->user()->sap_id,
                'logout',
                'logout',
                'This user has click logout from website'
            );
        }

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('index');
    }
}
