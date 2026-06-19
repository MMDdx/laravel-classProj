<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">ویرایش رزرو #{{ $booking->id }}</h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    <div class="mb-4">
                        <p><strong>کاربر:</strong> {{ $booking->user->name }} ({{ $booking->user->email }})</p>
                        <p><strong>تور:</strong> {{ $booking->tour->title }}</p>
                        <p><strong>تعداد نفرات:</strong> {{ $booking->number_of_people }}</p>
                        <p><strong>قیمت کل:</strong> {{ number_format($booking->total_price) }} تومان</p>
                    </div>
                    <form method="POST" action="{{ route('admin.bookings.update', $booking) }}">
                        @csrf @method('PUT')
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">وضعیت</label>
                            <select name="status" class="w-full rounded-lg border-gray-300">
                                <option value="pending" {{ $booking->status == 'pending' ? 'selected' : '' }}>در انتظار</option>
                                <option value="confirmed" {{ $booking->status == 'confirmed' ? 'selected' : '' }}>تأیید شده</option>
                                <option value="cancelled" {{ $booking->status == 'cancelled' ? 'selected' : '' }}>لغو شده</option>
                            </select>
                        </div>
                        <div class="flex gap-4">
                            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg">به‌روزرسانی</button>
                            <a href="{{ route('admin.bookings.index') }}" class="bg-gray-300 px-4 py-2 rounded-lg">بازگشت</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
