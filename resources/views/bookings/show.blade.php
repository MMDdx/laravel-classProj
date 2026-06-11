<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">جزئیات رزرو</h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    @if(session('success'))
                        <div class="bg-green-100 border-green-400 text-green-700 px-4 py-2 rounded mb-4">{{ session('success') }}</div>
                    @endif

                    <div class="border-b pb-4 mb-4">
                        <h3 class="text-lg font-bold">{{ $booking->tour->title }}</h3>
                        <p class="text-gray-600 mt-1">{{ $booking->tour->location }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div><span class="font-semibold">تعداد نفرات:</span> {{ $booking->number_of_people }}</div>
                        <div><span class="font-semibold">قیمت کل:</span> {{ number_format($booking->total_price) }} تومان</div>
                        <div><span class="font-semibold">وضعیت:</span>
                            @if($booking->status == 'pending') <span class="text-yellow-600">در انتظار تایید</span>
                            @elseif($booking->status == 'confirmed') <span class="text-green-600">تایید شده</span>
                            @else <span class="text-red-600">لغو شده</span> @endif
                        </div>
                        <div><span class="font-semibold">تاریخ رزرو:</span> {{ verta($booking->created_at)->format('d %B Y ساعت H:i') }}</div>
                        <div class="col-span-2"><span class="font-semibold">تاریخ شروع تور:</span> {{ verta($booking->tour->start_date)->format('d %B Y') }}</div>
                        <div class="col-span-2"><span class="font-semibold">تاریخ پایان تور:</span> {{ verta($booking->tour->end_date)->format('d %B Y') }}</div>
                    </div>

                    <div class="mt-6 flex gap-4">
                        <a href="{{ route('bookings.index') }}" class="text-indigo-600 hover:underline">← بازگشت به رزروهای من</a>
                        @if($booking->status == 'pending')
                            <form method="POST" action="{{ route('bookings.cancel', $booking) }}" onsubmit="return confirm('لغو رزرو؟')">
                                @csrf @method('PATCH')
                                <button type="submit" class="text-red-600 hover:underline">لغو رزرو</button>
                            </form>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
