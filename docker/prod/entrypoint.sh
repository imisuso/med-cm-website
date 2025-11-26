#!/bin/bash
set -e

# รัน Migration (ถ้าต้องการให้ทำอัตโนมัติ ระวังเรื่อง Data หายถ้า setup ผิด)
# php artisan migrate --force

# Cache Config ทั้งหมดเพื่อความเร็วสูงสุด
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# เริ่ม Supervisor (ซึ่งจะไปเรียก Nginx + PHP-FPM)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
