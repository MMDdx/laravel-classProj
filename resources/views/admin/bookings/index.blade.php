<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">مدیریت رزروها</h2>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    @if(session('success'))
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{{ session('success') }}</div>
                    @endif

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">شناسه</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">کاربر</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تور</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تعداد نفرات</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت کل</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            @foreach($bookings as $booking)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $booking->id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $booking->user->name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $booking->tour->title }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $booking->number_of_people }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ number_format($booking->total_price) }} تومان</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs rounded-full
                                            @if($booking->status == 'confirmed') bg-green-100 text-green-800
                                            @elseif($booking->status == 'cancelled') bg-red-100 text-red-800
                                            @else bg-yellow-100 text-yellow-800 @endif">
                                            {{ $booking->status == 'confirmed' ? 'تأیید شده' : ($booking->status == 'cancelled' ? 'لغو شده' : 'در انتظار') }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <a href="{{ route('admin.bookings.show', $booking) }}" class="text-indigo-600 hover:underline">ویرایش</a>
                                        <form method="POST" action="{{ route('admin.bookings.destroy', $booking) }}" class="inline" onsubmit="return confirm('حذف رزرو؟')">
                                            @csrf @method('DELETE')
                                            <button type="submit" class="text-red-600 hover:underline mr-2">حذف</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">{{ $bookings->links() }}</div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
