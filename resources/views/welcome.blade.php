<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تورلی – سفرهای به‌یادماندنی</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            font-family: 'Vazir', 'Tahoma', system-ui, sans-serif;
        }
        .hero-gradient {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
        }
        .card-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
        }
    </style>
</head>
<body class="bg-gray-50 antialiased">

<!-- Navbar -->
<nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="{{ url('/') }}" class="text-2xl font-bold text-indigo-600">تورلی</a>
                <span class="text-xs text-gray-400 mr-2 hidden sm:inline">Tourly</span>
            </div>

            <!-- دکمه‌های ورود/ثبت‌نام / داشبورد / خروج -->
            <div class="flex items-center space-x-4 space-x-reverse">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/dashboard') }}" class="text-gray-700 hover:text-indigo-600 transition font-medium">
                            <i class="fas fa-tachometer-alt ml-1"></i> داشبورد
                        </a>
                        <form method="POST" action="{{ route('logout') }}" class="inline">
                            @csrf
                            <button type="submit" class="text-gray-700 hover:text-red-600 transition font-medium">
                                <i class="fas fa-sign-out-alt ml-1"></i> خروج
                            </button>
                        </form>
                    @else
                        <a href="{{ route('login') }}" class="text-gray-700 hover:text-indigo-600 transition font-medium">
                            <i class="fas fa-sign-in-alt ml-1"></i> ورود
                        </a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                                <i class="fas fa-user-plus ml-1"></i> ثبت‌نام
                            </a>
                        @endif
                    @endauth
                @endif
            </div>
        </div>
    </div>
</nav>

<!-- Hero Section -->
<section class="hero-gradient text-white py-20 md:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4">سفرهای رویایی با <span class="text-yellow-300">تورلی</span></h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            بهترین تورهای داخلی و خارجی، قیمت‌های مناسب، پشتیبانی ۲۴ ساعته
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="{{ route('register') }}" class="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-flex items-center justify-center">
                <i class="fas fa-calendar-alt ml-2"></i> رزرو آنلاین تور
            </a>
            <a href="#tours" class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-indigo-800 transition inline-flex items-center justify-center">
                <i class="fas fa-chevron-down ml-2"></i> مشاهده تورها
            </a>
        </div>
    </div>
</section>

<!-- ویژگی‌ها -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800">چرا تورلی را انتخاب می‌کنید؟</h2>
            <p class="text-gray-500 mt-2">تجربه‌ای متفاوت از سفر</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6 rounded-xl card-hover bg-gray-50">
                <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-tag text-indigo-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">بهترین قیمت‌ها</h3>
                <p class="text-gray-500 mt-2">تضمین پایین‌ترین قیمت نسبت به بازار</p>
            </div>
            <div class="text-center p-6 rounded-xl card-hover bg-gray-50">
                <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-headset text-indigo-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">پشتیبانی ۲۴ ساعته</h3>
                <p class="text-gray-500 mt-2">تیم پشتیبانی همواره همراه شما</p>
            </div>
            <div class="text-center p-6 rounded-xl card-hover bg-gray-50">
                <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-shield-alt text-indigo-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">سفر امن</h3>
                <p class="text-gray-500 mt-2">بیمه مسافرتی رایگان به همراه تمام تورها</p>
            </div>
        </div>
    </div>
</section>

<!-- تورهای محبوب (داینامیک از دیتابیس) -->
<section id="tours" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800">تورهای محبوب</h2>
            <p class="text-gray-500 mt-2">مقاصد فوق‌العاده برای سفر شما</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @forelse($popularTours as $tour)
                <div class="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                    <img src="{{ $tour->image_url ?? 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=500&h=300&fit=crop' }}"
                         alt="{{ $tour->title }}"
                         class="w-full h-48 object-cover">
                    <div class="p-5">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-bold text-gray-800">{{ $tour->title }}</h3>
                            <span class="text-indigo-600 font-bold">{{ number_format($tour->price) }} تومان</span>
                        </div>
                        <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ $tour->description }}</p>
                        <a href="{{ route('tours.show', $tour) }}" class="mt-4 inline-block w-full text-center bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition">
                            جزئیات و رزرو
                        </a>
                    </div>
                </div>
            @empty
                <p class="text-gray-500 col-span-3 text-center">هیچ توری یافت نشد.</p>
            @endforelse
        </div>
        <div class="text-center mt-10">
            <a href="{{ route('tours.index') }}" class="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow">
                <i class="fas fa-arrow-left ml-2"></i> مشاهده همه تورها
            </a>
        </div>
    </div>
</section>

<!-- فوتر -->
<footer class="bg-gray-900 text-gray-300 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>© ۱۴۰۴ – تمامی حقوق متعلق به <span class="text-indigo-400">تورلی</span> است.</p>
        <div class="mt-4 flex justify-center space-x-4 space-x-reverse">
            <a href="#" class="hover:text-white transition"><i class="fab fa-instagram"></i></a>
            <a href="#" class="hover:text-white transition"><i class="fab fa-telegram"></i></a>
            <a href="#" class="hover:text-white transition"><i class="fab fa-whatsapp"></i></a>
        </div>
    </div>
</footer>
</body>
</html>
