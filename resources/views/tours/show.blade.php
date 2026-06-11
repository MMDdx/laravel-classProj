<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $tour->title }} | تورلی</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    </style>
</head>
<body class="bg-gray-100 antialiased">

<!-- Navbar (reuse same as welcome page) -->
<nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <a href="{{ url('/') }}" class="text-2xl font-bold text-indigo-600">تورلی</a>
                <span class="text-xs text-gray-400 mr-2 hidden sm:inline">Tourly</span>
            </div>
            <div class="flex items-center space-x-4 space-x-reverse">
                @auth
                    <a href="{{ url('/dashboard') }}" class="text-gray-700 hover:text-indigo-600 transition">
                        <i class="fas fa-tachometer-alt ml-1"></i> داشبورد
                    </a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-gray-700 hover:text-red-600 transition">
                            <i class="fas fa-sign-out-alt ml-1"></i> خروج
                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-gray-700 hover:text-indigo-600 transition">
                        <i class="fas fa-sign-in-alt ml-1"></i> ورود
                    </a>
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        <i class="fas fa-user-plus ml-1"></i> ثبت‌نام
                    </a>
                @endauth
            </div>
        </div>
    </div>
</nav>

<!-- Main content -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Back button -->
    <a href="{{ url()->previous() !== url()->current() ? url()->previous() : route('tours.index') }}" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <i class="fas fa-arrow-right ml-2"></i> بازگشت
    </a>

    <!-- Tour details card -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="md:flex">
            <!-- Image -->
            <div class="md:w-1/2">
                <img src="{{ $tour->image_url ?? 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=800&h=500&fit=crop' }}"
                     alt="{{ $tour->title }}"
                     class="w-full h-64 md:h-full object-cover">
            </div>
            <!-- Info -->
            <div class="md:w-1/2 p-6 md:p-8">
                <h1 class="text-3xl font-bold text-gray-800">{{ $tour->title }}</h1>
                <div class="flex items-center mt-2 text-gray-500">
                    <i class="fas fa-map-marker-alt ml-1 text-indigo-500"></i>
                    <span>{{ $tour->location }}</span>
                </div>
                <div class="mt-4 flex items-baseline">
                    <span class="text-3xl font-bold text-indigo-600">{{ number_format($tour->price) }}</span>
                    <span class="text-gray-500 mr-1">تومان</span>
                </div>
                <div class="mt-6">
                    <h3 class="font-semibold text-gray-700">توضیحات تور</h3>
                    <p class="text-gray-600 leading-relaxed mt-2">{{ $tour->description }}</p>
                </div>
                <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center gap-2 text-gray-600">
                        <i class="fas fa-calendar-alt text-indigo-500"></i>
                        <span>شروع: {{ verta($tour->start_date)->format('d %B Y') }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                        <i class="fas fa-calendar-check text-indigo-500"></i>
                        <span>پایان: {{ verta($tour->end_date)->format('d %B Y') }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                        <i class="fas fa-users text-indigo-500"></i>
                        <span>حداکثر ظرفیت: {{ $tour->max_capacity }} نفر</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                        <i class="fas fa-clock text-indigo-500"></i>
                        <span>مدت: {{ \Carbon\Carbon::parse($tour->start_date)->diffInDays(\Carbon\Carbon::parse($tour->end_date)) + 1 }} شب</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Booking section -->
    <div class="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">رزرو تور</h2>

        @auth
            <!-- Form for logged‑in users -->
            <form method="POST" action="{{ route('bookings.store') }}" id="bookingForm">
                @csrf
                <input type="hidden" name="tour_id" value="{{ $tour->id }}">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                        <input type="text" value="{{ auth()->user()->name }}" readonly
                               class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">ایمیل</label>
                        <input type="email" value="{{ auth()->user()->email }}" readonly
                               class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm">
                    </div>
                    <div>
                        <label for="number_of_people" class="block text-sm font-medium text-gray-700">تعداد نفرات</label>
                        <input type="number" name="number_of_people" id="number_of_people" min="1" max="{{ $tour->max_capacity }}" required
                               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">قیمت هر نفر</label>
                        <input type="text" value="{{ number_format($tour->price) }} تومان" readonly
                               class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">قیمت کل</label>
                        <input type="text" id="total_price_display" readonly
                               class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm font-bold text-indigo-600">
                        <input type="hidden" name="total_price" id="total_price_hidden">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">وضعیت پیش‌فرض</label>
                        <input type="text" value="در انتظار تأیید" readonly
                               class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm">
                        <input type="hidden" name="status" value="pending">
                    </div>
                </div>

                <div class="mt-6 flex justify-end">
                    <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow">
                        <i class="fas fa-check ml-2"></i> ثبت درخواست رزرو
                    </button>
                </div>
            </form>

            <script>
                const pricePerPerson = {{ $tour->price }};
                const peopleInput = document.getElementById('number_of_people');
                const totalDisplay = document.getElementById('total_price_display');
                const totalHidden = document.getElementById('total_price_hidden');

                function updateTotal() {
                    let people = parseInt(peopleInput.value) || 1;
                    let total = pricePerPerson * people;
                    totalDisplay.value = total.toLocaleString() + ' تومان';
                    totalHidden.value = total;
                }

                peopleInput.addEventListener('input', updateTotal);
                updateTotal(); // initial
            </script>
        @else
            <!-- Guest message -->
            <div class="text-center py-8">
                <i class="fas fa-lock text-5xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">برای رزرو تور ابتدا وارد حساب خود شوید</h3>
                <p class="text-gray-500 mt-2">ثبت‌نام فقط چند دقیقه طول می‌کشد.</p>
                <div class="mt-6 flex justify-center gap-4">
                    <a href="{{ route('login') }}" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                        ورود به حساب
                    </a>
                    <a href="{{ route('register') }}" class="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition">
                        ثبت‌نام
                    </a>
                </div>
            </div>
        @endauth
    </div>
</div>

<!-- Comment Section (Placeholder for future implementation) -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800">نظرات کاربران</h2>
            <p class="text-gray-500 mt-2">تجربیات دیگران از سفر با تورلی</p>
        </div>
        <div class="bg-gray-50 rounded-2xl p-6 shadow-sm">
            @auth
                <!-- Comment form for logged-in users (to be implemented) -->
                <div class="mb-8">
                    <h3 class="font-semibold text-gray-800 mb-3">نظر خود را بنویسید</h3>
                    <textarea rows="3" placeholder="نظر شما..." class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" disabled></textarea>
                    <button class="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" disabled>ارسال نظر (در حال توسعه)</button>
                    <p class="text-xs text-gray-400 mt-2">❌ بخش نظرات هنوز فعال نشده است – به زودی اضافه می‌شود.</p>
                </div>
            @else
                <!-- Message for guests -->
                <div class="text-center py-6">
                    <i class="fas fa-comment-dots text-4xl text-gray-400 mb-3"></i>
                    <p class="text-gray-600">برای ثبت نظر و دیدن نظرات دیگران، لطفاً <a href="{{ route('login') }}" class="text-indigo-600 hover:underline">وارد شوید</a> یا <a href="{{ route('register') }}" class="text-indigo-600 hover:underline">ثبت‌نام کنید</a>.</p>
                </div>
            @endauth
            <!-- Sample static comments (placeholder) -->
            <div class="mt-6 space-y-4">
                <div class="border-t pt-4">
                    <p class="font-semibold">احمد رضایی</p>
                    <p class="text-gray-600 text-sm">تور فوق‌العاده‌ای بود، پشتیبانی عالی!</p>
                </div>
                <div class="border-t pt-4">
                    <p class="font-semibold">سارا محمدی</p>
                    <p class="text-gray-600 text-sm">بسیار لذت بردم، حتماً دوباره شرکت می‌کنم.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Footer (same as welcome) -->
<footer class="bg-gray-900 text-gray-300 py-10 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>© ۱۴۰۴ – تمامی حقوق متعلق به <span class="text-indigo-400">تورلی</span> است.</p>
    </div>
</footer>

@if($errors->any())
    <div class="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow">
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

</body>
</html>
