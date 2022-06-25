<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        // \Log::info("Handle Inertia Request");
        //\Log::info($request->user());
        return array_merge(parent::share($request), [
            'auth' => $request->user() ? [
                //'user' => $request->user(),
                'abilities'=> $request->user()->abilities,
                //'person_slug' => $request->user()->person->slug,
                'person_fname' => $request->user()->person->fname_th,
                'person_lname' => $request->user()->person->lname_th,
                'person_image' => $request->user()->person->image_url,
                'division_id' => $request->user()->person->division->division_id,
                'division_name_th' => $request->user()->person->division->name_th,
                'division_type' => $request->user()->person->division->division_type,
            ] : null,
            // 'flash' => [
            //     'status' => fn () => $request->session()->pull('status'),
            //     'msg' => fn () => $request->session()->pull('msg'),
            //     'mainMenuLinks' => fn () => $request->session()->pull('mainMenuLinks',[]),
            //     'actionMenu' => fn () => $request->session()->pull('action-menu', []),
            // ],
        ]);
    }
}
