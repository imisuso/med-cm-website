<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $request = $this->app['request'];

        // -----------------------------------------------------------
        // กรณี Production: บังคับ HTTPS อย่างเดียว จบข่าว
        // -----------------------------------------------------------
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
            return; // ออกจากฟังก์ชันเลย ไม่ต้องทำ logic ด้านล่างต่อ
        }

        // -----------------------------------------------------------
        // กรณี Local / Dev: ดิ้นได้ตาม Port (8081 / 8443)
        // -----------------------------------------------------------

        // พยายามอ่านค่า Host จริงๆ ที่ส่งมาจาก Nginx
        // X-Forwarded-Host จะแม่นยำกว่าถ้าผ่าน Proxy
        $host = $request->header('X-Forwarded-Host') ?? $request->getHttpHost();
        $scheme = $request->header('X-Forwarded-Proto') ?? $request->getScheme();

        if ($host) {
            // ไม้ตาย: บังคับ Root URL ให้ตรงกับสิ่งที่ User เห็น (รวม Port)
            // เช่น http://website.test:8081 หรือ https://website.test:8443
            URL::forceRootUrl($scheme . '://' . $host);
        }

        // บังคับ Scheme ตามที่ได้รับมา
        if ($scheme === 'https') {
            URL::forceScheme('https');
        } else {
            URL::forceScheme('http'); // บังคับกลับเป็น http ด้วยถ้าไม่ใช่ https
        }
    }
}
