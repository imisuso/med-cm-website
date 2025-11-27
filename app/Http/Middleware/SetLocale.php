<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // เช็คว่าใน Session มีค่าภาษาที่เลือกไว้ไหม
        if (Session::has('locale')) {
            app()->setLocale(session()->get('locale'));
        } else {
            // ถ้าไม่มี ให้ใช้ภาษาหลักของแอพ
            app()->setLocale(config('app.locale'));
        }

        return $next($request);
    }
}
