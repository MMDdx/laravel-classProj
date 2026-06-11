<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>همه تورها | تورلی</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        .card-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
        }
    </style>
</head>
<body class="bg-gray-100 antialiased">

<!-- Navbar (exactly as welcome page) -->
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

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">همه تورها</h1>

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-1/4">
            <div class="bg-white rounded-xl shadow-md p-5 sticky top-24">
                <h3 class="font-bold text-lg text-gray-800 mb-4">جستجو و فیلتر</h3>
                <form method="GET" action="{{ route('tours.index') }}" id="filterForm">
                    <!-- Search (title) -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">جستجوی عنوان</label>
                        <input type="text" name="search" value="{{ request('search') }}" placeholder="مثلاً: کیش" class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <!-- Location -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">مکان</label>
                        <input type="text" name="location" value="{{ request('location') }}" placeholder="شهر یا کشور" class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <!-- Price Range -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">بازه قیمت (تومان)</label>
                        <div class="flex gap-2">
                            <input type="number" name="min_price" value="{{ request('min_price') }}" placeholder="حداقل" class="w-1/2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                            <input type="number" name="max_price" value="{{ request('max_price') }}" placeholder="حداکثر" class="w-1/2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                    </div>
                    <!-- Start Date -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">از تاریخ شروع</label>
                        <input type="date" name="start_date" value="{{ request('start_date') }}" class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <!-- End Date -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">تا تاریخ پایان</label>
                        <input type="date" name="end_date" value="{{ request('end_date') }}" class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <!-- Sort -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">مرتب‌سازی بر اساس</label>
                        <select name="sort" class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                            <option value="start_date" {{ request('sort') == 'start_date' ? 'selected' : '' }}>تاریخ شروع (قدیمی‌تر)</option>
                            <option value="price" {{ request('sort') == 'price' ? 'selected' : '' }}>قیمت (کمترین)</option>
                            <option value="price_desc" {{ request('sort') == 'price_desc' ? 'selected' : '' }}>قیمت (بیشترین)</option>
                            <option value="title" {{ request('sort') == 'title' ? 'selected' : '' }}>عنوان</option>
                        </select>
                        <input type="hidden" name="direction" id="direction" value="{{ request('direction', 'asc') }}">
                    </div>
                    <div class="flex gap-2">
                        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full">اعمال فیلتر</button>
                        <a href="{{ route('tours.index') }}" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-center">لغو</a>
                    </div>
                </form>
            </div>
        </div>

        <!-- Tour Cards Grid -->
        <div class="lg:w-3/4">
            @if($tours->count() > 0)
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    @foreach($tours as $tour)
                        <div class="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                            <img src="{{ $tour->image_url ?? 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=400&h=250&fit=crop' }}"
                                 alt="{{ $tour->title }}"
                                 class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-xl font-bold text-gray-800">{{ $tour->title }}</h3>
                                <div class="flex items-center text-gray-500 text-sm mt-1">
                                    <i class="fas fa-map-marker-alt ml-1 text-indigo-500"></i>
                                    <span>{{ $tour->location }}</span>
                                </div>
                                <div class="flex justify-between items-center mt-3">
                                    <span class="text-indigo-600 font-bold">{{ number_format($tour->price) }} تومان</span>
                                    <span class="text-gray-500 text-sm"><i class="far fa-calendar ml-1"></i> {{ \Carbon\Carbon::parse($tour->start_date)->format('Y/m/d') }}</span>
                                </div>
                                <a href="{{ route('tours.show', $tour) }}" class="mt-4 inline-block w-full text-center bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition">
                                    مشاهده جزئیات
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
                <!-- Pagination -->
                <div class="mt-10">
                    {{ $tours->links() }}
                </div>
            @else
                <div class="bg-white rounded-xl shadow-md p-12 text-center">
                    <i class="fas fa-search text-5xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700">هیچ توری با این مشخصات یافت نشد</h3>
                    <p class="text-gray-500 mt-2">لطفاً فیلترهای دیگری را امتحان کنید.</p>
                    <a href="{{ route('tours.index') }}" class="inline-block mt-4 text-indigo-600 hover:underline">نمایش همه تورها</a>
                </div>
            @endif
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="bg-gray-900 text-gray-300 py-10 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>© ۱۴۰۴ – تمامی حقوق متعلق به <span class="text-indigo-400">تورلی</span> است.</p>
    </div>
</footer>

<script>
    // Handle sort direction for price
    document.querySelector('select[name="sort"]').addEventListener('change', function() {
        let dir = document.getElementById('direction');
        if (this.value === 'price_desc') {
            dir.value = 'desc';
            this.value = 'price';
        } else if (this.value === 'price') {
            dir.value = 'asc';
        } else {
            dir.value = 'asc';
        }
        document.getElementById('filterForm').submit();
    });
</script>
</body>
</html>
