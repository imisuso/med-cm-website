<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <link href="{{ asset(mix('/css/app.css')) }}" rel="stylesheet" />
    <script src="{{ asset(mix('/js/app.js')) }}" defer></script>
    
    <script>
        const base_url = "{{ env('APP_URL') }}";
    </script>
    {{-- Loads Sarabun font --}}
    @googlefonts('Sarabun')
    <style>
        @font-face {
            font-family: 'DBLim';
            src: url("{{ asset('/fonts/mahidol/DB_Lim_X_v3.2.ttf') }}");
        }
    </style>
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