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
        $sso_url = env('RESET_PASSWORD_URL', '/');
        return Inertia::render('LoginForm', compact('sso_url'));
    }

    public function login_authen(Request $request, AuthUserAPI $api)
    {
        $getUserFromAPI = $api->authenticate($request->username, $request->password);

        //กรณีเรียกใช้ serviec hannah ไม่ได้
        if( strcmp($getUserFromAPI['reply_code'], '1') === 0 ) {
            return Redirect::back()->withErrors(['msg' => $getUserFromAPI['reply_text']]);
        }

        // กรณี hannah เรียกใช้ serviec ของ AD ไม่ได้
        if( strcmp($getUserFromAPI['reply_code'], '2') === 0 ) {
            return Redirect::back()->withErrors(['msg' => $getUserFromAPI['reply_text']]);
        }

        // กรณีไม่พบ username หรือ username หรือ password ของ AD ไม่ถูกต้อง หรือ password หมดอายุ (ทุกกรณีที่กล่าวมา จะไม่พบข้อมูล user เลย ไม่สามารถแยก case ได้)
        if( strcmp($getUserFromAPI['reply_code'], '3') === 0 ) {
            $resp = (new LogManager)->store(
                $request->username,
                'login',
                'login',
                'พยายาม login เข้าใช้งานด้วย username:'.$request->username.' => reply_text:'.$getUserFromAPI['reply_text'],
                'security'
            );

//            return Redirect::back()->withErrors(['msg' => $getUserFromAPI['reply_text']]);
            return Redirect::back()->withErrors(['msg' => '<u>ไม่สามารถเข้าใช้งานระบบได้ ซึ่งอาจเกิดจาก</u> <br>1. กรอก Username หรือ Password ไม่ถูกต้อง หรือ<br>2. Password หมดอายุ']);
        }

        $user = User::where('sap_id', $getUserFromAPI['org_id'])->first();

        if ($user) {
            // กรณี user ถูก disable การใช้งานชั่วคราว
            if( ! $user->status ) {
                $resp = (new LogManager)->store(
                    $getUserFromAPI['org_id'],
                    'login',
                    'login',
                    'ถูก disable สถานะการใช้งาน',
                    'security'
                );
                return Redirect::back()->withErrors(['msg' => 'คุณ '. $getUserFromAPI['login'] .' ไม่มีสิทธิ์ในการใช้งานระบบ <br> กรุณาติดต่อเจ้าหน้าที่ ภ.อายุรศาสตร์ หน่วยเวชสารสนเทศ']);
            }

            Auth::login($user);
            $resp = (new LogManager)->store(
                $getUserFromAPI['org_id'],
                'login',
                'login',
                'ทำการ login เข้าใช้งาน website',
                'security'
            );

            // Update user ที่ใช้ login และ email ให้ตรงกับที่ AD ทำการ return กลับมา (กรณีข้อมูลใน database ไม่ตรงกับ AD)
            if( strcmp($getUserFromAPI['login'], $user->name) !== 0
                || strcmp($getUserFromAPI['email'], $user->email) !== 0 )
            {
                $user->name = $getUserFromAPI['login'];
                $user->email = $getUserFromAPI['email'];
                $user->save();
            }
        } else {
            $resp = (new LogManager)->store(
                $getUserFromAPI['org_id'],
                'login',
                'login',
                'ไม่มีสิทธิ์ในการเข้าจัดการเนื้อหาของ website',
                'security'
            );

            return Redirect::back()->withErrors(['msg' => 'คุณ '. $getUserFromAPI['login'] .' ยังไม่มีสิทธิ์ในการเข้าจัดการเนื้อหาของ website <br> กรุณาติดต่อเจ้าหน้าที่ ภ.อายุรศาสตร์ หน่วยเวชสารสนเทศ']);
        }

//        return redirect()->route('admin.index');
        return redirect()->route('test.index');
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
                'ทำการ logout จาก website',
                'info'
            );
        }

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
