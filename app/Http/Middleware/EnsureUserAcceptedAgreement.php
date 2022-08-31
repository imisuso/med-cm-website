<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserAcceptedAgreement
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user()
            || ! $request->user()->needAcceptAgreement()
            || $request->routeIs('admin.agreement')
            || $request->routeIs('admin.accept-agreement')
            || $request->routeIs('logout')
        ) {
            return $next($request);
        }

        return redirect()->route('admin.agreement');
    }
}
