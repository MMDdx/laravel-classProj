<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <!-- کارت خوش‌آمدگویی -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6 text-gray-900">
                    {{ __("به پنل کاربری خوش آمدید، ") }} {{ Auth::user()->name }}!
                </div>
                @auth
                    @if(auth()->user()->is_admin)
                        <div class="border-t border-gray-200 pt-4 mt-4">
                            <div class="px-4 text-xs text-gray-500 uppercase">مدیریت</div>
                            <a href="{{ route('admin.users.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">مدیریت کاربران</a>
                            <a href="{{ route('admin.tours.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">مدیریت تورها</a>
                        </div>
                    @endif
                @endauth
            </div>

            <!-- دکمه‌های عملیاتی مرتبط با پروژه -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6">
                    <h3 class="text-lg font-semibold mb-4">⚡ عملیات سریع</h3>
                    <div class="flex flex-wrap gap-3">
                        {{-- دکمه مشاهده همه تورها (primary) --}}
                        <x-button href="{{ route('tours.index') }}" icon="fa-eye" variant="primary">
                            مشاهده تورها
                        </x-button>

                        {{-- دکمه رزرو تور جدید (success) --}}
                        <x-button href="{{ route('tours.index') }}" icon="fa-calendar-plus" variant="success">
                            رزرو تور جدید
                        </x-button>

                        {{-- دکمه مشاهده رزروهای من (outline) --}}
                        <x-button href="{{ route('bookings.index') }}" icon="fa-ticket-alt" variant="outline">
                            رزروهای من
                        </x-button>

                        {{-- دکمه لغو رزرو (danger) – در صورت داشتن متد جداگانه --}}
                        <x-button href="#" icon="fa-trash-alt" variant="danger"
                                  onclick="event.preventDefault(); if(confirm('لغو رزرو؟')) document.getElementById('cancel-form').submit();">
                            لغو آخرین رزرو
                        </x-button>

                        {{-- دکمه بایگانی تورها (ghost) --}}
                        <x-button href="{{ route('tours.index') }}?filter=archived" icon="fa-archive" variant="ghost">
                            تورهای بایگانی شده
                        </x-button>
                    </div>

                    {{-- فرم مخفی برای لغو رزرو (در صورت نیاز) --}}
                    <form id="cancel-form" method="POST" action="{{ route('bookings.cancel', ['booking' => auth()->user()->bookings()->latest()->first()->id ?? 0]) }}" style="display:none">
                        @csrf @method('DELETE')
                    </form>
                </div>
            </div>

            <!-- نمایش آخرین رزروها با دکمه‌های اختصاصی داخل جدول -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    <h3 class="text-lg font-semibold mb-4">📋 آخرین رزروهای شما</h3>
                    @if($recentBookings->count())
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تور</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تعداد نفرات</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت کل</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                                </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($recentBookings as $booking)
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $booking->tour->title }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ $booking->number_of_people }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ number_format($booking->total_price) }} تومان</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 py-1 text-xs rounded-full
                                                @if($booking->status === 'confirmed') bg-green-100 text-green-800
                                                @elseif($booking->status === 'cancelled') bg-red-100 text-red-800
                                                @else bg-yellow-100 text-yellow-800 @endif">
                                                {{ $booking->status }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            {{-- دکمه مشاهده جزئیات رزرو --}}
                                            <x-button href="{{ route('bookings.show', $booking) }}" icon="fa-info-circle" variant="outline" class="text-xs px-2 py-1">
                                                جزئیات
                                            </x-button>
                                            @if($booking->status !== 'cancelled')
                                                <x-button href="#" icon="fa-times-circle" variant="danger" class="text-xs px-2 py-1"
                                                          onclick="event.preventDefault(); if(confirm('لغو این رزرو؟')) document.getElementById('cancel-booking-{{ $booking->id }}').submit();">
                                                    لغو
                                                </x-button>
                                                <form id="cancel-booking-{{ $booking->id }}" method="POST" action="{{ route('bookings.update', $booking) }}" style="display:none">
                                                    @csrf @method('PATCH')
                                                    <input type="hidden" name="status" value="cancelled">
                                                </form>
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <p class="text-gray-500">هنوز رزروی انجام نداده‌اید.</p>
                        <div class="mt-4">
                            <x-button href="{{ route('tours.index') }}" icon="fa-search" variant="primary">
                                مشاهده تورها و رزرو
                            </x-button>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
