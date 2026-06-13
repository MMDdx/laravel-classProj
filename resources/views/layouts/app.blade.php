<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Tourly') }} - پنل کاربری</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        /* Custom scrollbar for sidebar */
        .sidebar-scroll::-webkit-scrollbar {
            width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-gray-100 font-sans antialiased">
<div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-72 bg-white shadow-lg flex flex-col fixed inset-y-0 right-0 z-30 border-l border-gray-200 sidebar-scroll overflow-y-auto">
        <div class="p-6 border-b">
            <a href="{{ route('dashboard') }}" class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">تورلی</a>
            <p class="text-xs text-gray-400 mt-1">پنل کاربری</p>
        </div>
        <nav class="flex-1 p-4 space-y-1">
            <a href="{{ route('dashboard') }}" class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition {{ request()->routeIs('dashboard') ? 'bg-indigo-50 text-indigo-600' : '' }}">
                <i class="fas fa-tachometer-alt w-5"></i> <span>داشبورد</span>
            </a>
            <a href="{{ route('tours.index') }}" class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                <i class="fas fa-map-marked-alt w-5"></i> <span>تورها</span>
            </a>
            <a href="{{ route('bookings.index') }}" class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition {{ request()->routeIs('bookings.*') ? 'bg-indigo-50 text-indigo-600' : '' }}">
                <i class="fas fa-ticket-alt w-5"></i> <span>رزروهای من</span>
            </a>
            <div class="pt-4 mt-4 border-t">
                <a href="{{ route('profile.edit') }}" class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                    <i class="fas fa-user-circle w-5"></i> <span>پروفایل من</span>
                </a>
            </div>
            @if(auth()->user()->is_admin)
                <div class="pt-4 mt-4 border-t">
                    <p class="px-4 text-xs font-semibold text-gray-400 uppercase">مدیریت</p>
                    <a href="{{ route('admin.users.index') }}" class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition mt-1">
                        <i class="fas fa-users w-5"></i> <span>مدیریت کاربران</span>
                    </a>
                    <a href="{{ route('admin.tours.index') }}" class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                        <i class="fas fa-umbrella-beach w-5"></i> <span>مدیریت تورها</span>
                    </a>
                </div>
            @endif
        </nav>
        <div class="p-4 border-t">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
                    <i class="fas fa-sign-out-alt w-5"></i> <span>خروج</span>
                </button>
            </form>
        </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 mr-72">
        <!-- Top bar -->
        <div class="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
            <div class="text-gray-600 text-sm">
                <i class="fas fa-user-circle ml-1 text-indigo-500"></i> {{ Auth::user()->name }}
            </div>
            <div class="text-sm text-gray-500">
                تاریخ امروز: {{ \Morilog\Jalali\Jalalian::now()->format('d F Y') }}
            </div>
        </div>
        <div class="p-6">
            {{ $slot }}
        </div>
    </main>
</div>
</body>
</html>
