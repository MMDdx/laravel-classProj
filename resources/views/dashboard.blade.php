<x-app-layout>
    <div class="max-w-7xl mx-auto">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800">خوش آمدید، {{ Auth::user()->name }} 👋</h1>
            <p class="text-gray-500 mt-1">از آخرین فعالیت‌های خود مطلع شوید</p>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-blue-100 text-sm">کل رزروها</p>
                        <p class="text-3xl font-bold">{{ $totalBookings ?? 0 }}</p>
                    </div>
                    <i class="fas fa-calendar-check text-4xl text-blue-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-green-100 text-sm">رزروهای تأیید شده</p>
                        <p class="text-3xl font-bold">{{ $confirmedBookings ?? 0 }}</p>
                    </div>
                    <i class="fas fa-check-circle text-4xl text-green-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow p-6 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-indigo-100 text-sm">تورهای فعال</p>
                        <p class="text-3xl font-bold">{{ $activeToursCount ?? 0 }}</p>
                    </div>
                    <i class="fas fa-umbrella-beach text-4xl text-indigo-200"></i>
                </div>
            </div>
        </div>

        <!-- Recent bookings -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <div class="px-6 py-4 border-b flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800">آخرین رزروهای شما</h2>
                <a href="{{ route('bookings.index') }}" class="text-indigo-600 text-sm hover:underline">مشاهده همه</a>
            </div>
            <div class="p-6">
                @if($recentBookings->count())
                    <div class="space-y-3">
                        @foreach($recentBookings as $booking)
                            <div class="flex justify-between items-center border-b pb-3 last:border-0">
                                <div>
                                    <p class="font-semibold">{{ $booking->tour->title }}</p>
                                    <p class="text-sm text-gray-500">{{ $booking->number_of_people }} نفر - {{ number_format($booking->total_price) }} تومان</p>
                                </div>
                                <span class="text-sm px-3 py-1 rounded-full
                                    @if($booking->status == 'confirmed') bg-green-100 text-green-700
                                    @elseif($booking->status == 'cancelled') bg-red-100 text-red-700
                                    @else bg-yellow-100 text-yellow-700 @endif">
                                    {{ $booking->status == 'confirmed' ? 'تأیید شده' : ($booking->status == 'cancelled' ? 'لغو شده' : 'در انتظار') }}
                                </span>
                            </div>
                        @endforeach
                    </div>
                @else
                    <p class="text-gray-500 text-center py-4">هیچ رزروی ندارید. برای رزرو به <a href="{{ route('tours.index') }}" class="text-indigo-600">صفحه تورها</a> بروید.</p>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
