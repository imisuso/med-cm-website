<!DOCTYPE html>
<html
    lang="en"
    {{-- [!!!] เพิ่ม Blade Directive นี้ --}}
    class="@if(config('app.grayscale_mode')) grayscale @endif"

    style="
        --web-saturation: {{ config('app.web_saturation', 100) }}%;
        --web-brightness: {{ config('app.web_brightness', 100) }}%;
        --web-contrast: {{ config('app.web_contrast', 100) }}%;
    "
>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    @vite('resources/js/app.js')
    <script>
        const base_url = "{{ env('APP_URL') }}";
    </script>

    {{-- <style>
        @font-face {
            font-family: 'DBLim';
            src: '../asset/fonts/mahidol/DB_Lim_X_v3.2.ttf';
        }
    </style> --}}

    {{-- Loads Sarabun font --}}
    @googlefonts('Sarabun')

    @routes
    @inertiaHead
    <title>ภาควิชาอายุรศาสตร์ คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล</title>
</head>
{{-- grayscale Theme --}}
{{-- <body class="filter grayscale"> --}}
<body>

    @inertia

</body>
</html>
