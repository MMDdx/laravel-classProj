<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                مدیریت تورها
            </h2>
            <a href="{{ route('admin.tours.create') }}" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">ایجاد تور جدید</a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    @if(session('success'))
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {{ session('success') }}
                        </div>
                    @endif
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عنوان</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">موقعیت</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ظرفیت</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            @foreach($tours as $tour)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $tour->title }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ number_format($tour->price) }} تومان</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $tour->location }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $tour->max_capacity }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        @if($tour->is_active)
                                            <span class="text-green-600">فعال</span>
                                        @else
                                            <span class="text-red-600">غیرفعال</span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                                        <a href="{{ route('admin.tours.edit', $tour) }}" class="text-indigo-600 hover:text-indigo-900">ویرایش</a>
                                        <form method="POST" action="{{ route('admin.tours.destroy', $tour) }}" onsubmit="return confirm('آیا مطمئنید؟')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-600 hover:text-red-900">حذف</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">
                        {{ $tours->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
