<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Announce' => 'App\Policies\AnnouncePolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // การใช้ Gate::before ให้ return true เสมอ เนื่องจากถ้าหากเงื่อนไขที่ต้องการไม่ตรง จะได้ลงมาทำ กฎที่กำหนดไว้ด้านล่างต่อได้
        Gate::before(function ($user, $ability) {
            if ($user->abilities->contains($ability)) {
                return true;
            }
        });

        // Gate::define('goto_admin_panel', function (User $user) {
        //     return $user->abilities->contains('goto_admin_panel');
        // });
    }
}
