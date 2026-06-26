<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $tour->title }} | تورلی</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        /* No external CDN needed – Font Awesome is local now */
    </style>
</head>
<body class="bg-gray-100 antialiased">

<!-- Navbar (simplified, same as before) -->
<nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-indigo-600">تورلی</a>
        <div class="flex gap-4">
            @auth
                <a href="/dashboard" class="text-gray-700">داشبورد</a>
                <form method="POST" action="{{ route('logout') }}" class="inline">
                    @csrf
                    <button type="submit" class="text-gray-700">خروج</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="text-gray-700">ورود</a>
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-3 py-1 rounded">ثبت‌نام</a>
            @endauth
        </div>
    </div>
</nav>

<div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Back button -->
    <a href="{{ url()->previous() !== url()->current() ? url()->previous() : route('tours.index') }}" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <i class="fas fa-arrow-right ml-2"></i> بازگشت
    </a>

    <!-- Tour details card -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div class="md:flex">
            <div class="md:w-1/2">
                <img src="{{ $tour->image_url ?? 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=800&h=500&fit=crop' }}"
                     alt="{{ $tour->title }}" class="w-full h-64 md:h-full object-cover">
            </div>
            <div class="md:w-1/2 p-6 md:p-8">
                <h1 class="text-3xl font-bold text-gray-800">{{ $tour->title }}</h1>
                <div class="flex items-center mt-2 text-gray-500">
                    <i class="fas fa-map-marker-alt ml-1 text-indigo-500"></i> {{ $tour->location }}
                </div>
                <div class="mt-4 text-3xl font-bold text-indigo-600">{{ number_format($tour->price) }} <span class="text-lg">تومان</span></div>
                <div class="mt-6">
                    <h3 class="font-semibold text-gray-700">توضیحات تور</h3>
                    <p class="text-gray-600 leading-relaxed mt-2">{{ $tour->description }}</p>
                </div>
                <div class="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div><i class="fas fa-calendar-alt text-indigo-500 ml-1"></i> شروع: {{ \Carbon\Carbon::parse($tour->start_date)->format('d/m/Y') }}</div>
                    <div><i class="fas fa-calendar-check text-indigo-500 ml-1"></i> پایان: {{ \Carbon\Carbon::parse($tour->end_date)->format('d/m/Y') }}</div>
                    <div><i class="fas fa-users text-indigo-500 ml-1"></i> ظرفیت: {{ $tour->max_capacity }} نفر</div>
                    <div><i class="fas fa-clock text-indigo-500 ml-1"></i> مدت: {{ \Carbon\Carbon::parse($tour->start_date)->diffInDays(\Carbon\Carbon::parse($tour->end_date)) + 1 }} شب</div>
                </div>
            </div>
        </div>
    </div>

    <!-- ========== BOOKING CARD – SEPARATE ========== -->
    <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">رزرو تور</h2>

        @auth
            <!-- User info (read-only) -->
            <div class="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-700 flex flex-wrap gap-4">
                <span><i class="fas fa-user ml-2 text-indigo-500"></i> {{ auth()->user()->name }}</span>
                <span><i class="fas fa-envelope ml-2 text-indigo-500"></i> {{ auth()->user()->email }}</span>
            </div>

            <form method="POST" action="{{ route('bookings.store') }}" id="bookingForm">
                @csrf
                <input type="hidden" name="tour_id" value="{{ $tour->id }}">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="number_of_people" class="block text-sm font-semibold text-gray-700 mb-1">تعداد نفرات <span class="text-red-500">*</span></label>
                        <input type="number" name="number_of_people" id="number_of_people"
                               min="1" max="{{ $tour->max_capacity }}" required
                               class="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" value="1">
                        <p class="text-xs text-gray-400 mt-1">ظرفیت باقیمانده: {{ $tour->remaining_capacity }} نفر</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">قیمت هر نفر</label>
                        <input type="text" value="{{ number_format($tour->price) }} تومان" readonly
                               class="w-full rounded-lg bg-gray-100 border-gray-200">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">قیمت کل</label>
                        <input type="text" id="total_price_display" readonly
                               class="w-full rounded-lg bg-gray-100 border-gray-200 font-bold text-indigo-700">
                        <input type="hidden" name="total_price" id="total_price_hidden">
                    </div>
                </div>

                <div class="mt-8 flex justify-end">
                    <button type="submit" id="submitBtn" class="bg-indigo-600 text-white px-8 py-2 rounded-xl hover:bg-indigo-700 transition shadow-md">
                        <i class="fas fa-check ml-2"></i> ثبت رزرو
                    </button>
                </div>
            </form>

            <script>
                const price = {{ $tour->price }};
                const peopleInput = document.getElementById('number_of_people');
                const totalDisplay = document.getElementById('total_price_display');
                const totalHidden = document.getElementById('total_price_hidden');
                const maxCap = {{ $tour->max_capacity }};

                function updateTotal() {
                    let people = parseInt(peopleInput.value) || 1;
                    if (people > maxCap) peopleInput.value = maxCap;
                    if (people < 1) peopleInput.value = 1;
                    people = parseInt(peopleInput.value);
                    let total = price * people;
                    totalDisplay.value = total.toLocaleString() + ' تومان';
                    totalHidden.value = total;
                }
                peopleInput.addEventListener('input', updateTotal);
                peopleInput.addEventListener('change', updateTotal);
                updateTotal();
            </script>
        @else
            <div class="text-center py-8">
                <i class="fas fa-lock text-5xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">برای رزرو تور وارد شوید</h3>
                <div class="mt-6 flex justify-center gap-4">
                    <a href="{{ route('login') }}" class="bg-indigo-600 text-white px-6 py-2 rounded-lg">ورود</a>
                    <a href="{{ route('register') }}" class="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg">ثبت‌نام</a>
                </div>
            </div>
        @endauth
    </div>

    <!-- ========== COMMENTS SECTION – CLEARLY SEPARATED ========== -->
    <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">نظرات کاربران</h2>

        @auth
            <div class="mb-6">
                <textarea rows="3" placeholder="نظر خود را بنویسید..." class="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500" disabled></textarea>
                <button class="mt-3 bg-gray-300 text-gray-600 px-4 py-2 rounded-xl cursor-not-allowed" disabled>ارسال نظر (در حال توسعه)</button>
                <p class="text-xs text-gray-400 mt-2">⚠️ بخش نظرات به زودی اضافه می‌شود.</p>
            </div>
        @else
            <div class="text-center py-6">
                <i class="fas fa-comment-dots text-4xl text-gray-400 mb-3"></i>
                <p class="text-gray-600">برای ثبت نظر، <a href="{{ route('login') }}" class="text-indigo-600 hover:underline">وارد شوید</a> یا <a href="{{ route('register') }}" class="text-indigo-600 hover:underline">ثبت‌نام کنید</a>.</p>
            </div>
        @endauth

        <!-- Sample static comments (placeholder) -->
        <div class="mt-6 space-y-4 border-t pt-6">
            <div>
                <p class="font-semibold">احمد رضایی</p>
                <p class="text-gray-600 text-sm">تور فوق‌العاده‌ای بود. خیلی لذت بردیم.</p>
            </div>
            <div>
                <p class="font-semibold">سارا محمدی</p>
                <p class="text-gray-600 text-sm">پشتیبانی عالی، حتماً دوباره استفاده می‌کنم.</p>
            </div>
        </div>
    </div>
</div>

<footer class="bg-gray-900 text-gray-300 py-6 mt-12 text-center">
    <p>© ۱۴۰۴ – تمامی حقوق متعلق به <span class="text-indigo-400">تورلی</span> است.</p>
</footer>
</body>
</html>
