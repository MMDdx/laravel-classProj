
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">رزروهای من</h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    @if(session('success'))
                        <div class="bg-green-100 border-green-400 text-green-700 px-4 py-2 rounded mb-4">{{ session('success') }}</div>
                    @endif

                    @if($bookings->count())
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500">تور</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500">تعداد نفرات</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500">قیمت کل</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500">وضعیت</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500">تاریخ رزرو</th>
                                    <th class="px-6 py-3"></th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($bookings as $booking)
                                    <tr class="border-b">
                                        <td class="px-6 py-4">{{ $booking->tour->title }}</td>
                                        <td class="px-6 py-4">{{ $booking->number_of_people }}</td>
                                        <td class="px-6 py-4">{{ number_format($booking->total_price) }} تومان</td>
                                        <td class="px-6 py-4">
                                            @if($booking->status == 'pending')
                                                <span class="text-yellow-600">در انتظار تایید</span>
                                            @elseif($booking->status == 'confirmed')
                                                <span class="text-green-600">تایید شده</span>
                                            @else
                                                <span class="text-red-600">لغو شده</span>
                                            @endif
                                        </td>
                                        <td class="px-6 py-4">{{ verta($booking->created_at)->format('d %B Y') }}</td>
                                        <td class="px-6 py-4">
                                            <a href="{{ route('bookings.show', $booking) }}" class="text-indigo-600 hover:underline">جزئیات</a>
                                            @if($booking->status == 'pending')
                                                <form method="POST" action="{{ route('bookings.cancel', $booking) }}" class="inline" onsubmit="return confirm('لغو رزرو؟')">
                                                    @csrf
                                                    @method('PATCH')
                                                    <button type="submit" class="text-red-600 hover:underline mr-2">لغو</button>
                                                </form>
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-4">{{ $bookings->links() }}</div>
                    @else
                        <p class="text-gray-500">هیچ رزروی ندارید. برای رزرو به <a href="{{ route('tours.index') }}" class="text-indigo-600">لیست تورها</a> بروید.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
