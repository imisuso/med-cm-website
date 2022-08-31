<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use App\Models\Visitor;

class CountVisitor
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
        $routeName = $request->route()->getName();
        $sessionToken = $request->session()->get('_token');
//        $ip = hash('sha512', $request->ip());
//        logger($routeName);
//        logger($sessionToken);
//        logger($ip);
//        logger($request->host());
//        logger($request->httpHost());
//        logger($request->schemeAndHttpHost());
//        logger($request->session()->all());

        if ( Visitor::whereDate('created_at', Carbon::today())
                ->where('session_token', $sessionToken)
                ->where('route_name', $routeName)
                ->count() < 1
        ) {
//            logger("Increment counter + 1");
            Visitor::create([
                'route_name' => $routeName,
                'session_token' => $sessionToken,
            ]);
        }
//        else {
//            logger("Skip increment counter");
//        }

        return $next($request);
    }
}
