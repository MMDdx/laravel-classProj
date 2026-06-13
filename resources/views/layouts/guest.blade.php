<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Tourly') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gradient-to-br from-indigo-50 to-white font-sans antialiased">
<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6">
        <div class="text-center">
            <a href="/" class="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">تورلی</a>
            <p class="mt-2 text-gray-500">بهترین تورهای داخلی و خارجی</p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-8">
            {{ $slot }}
        </div>
    </div>
</div>
</body>
</html>
