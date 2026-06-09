<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                ویرایش تور: {{ $tour->title }}
            </h2>
            <a href="{{ route('admin.tours.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                ← بازگشت به لیست
            </a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">

                    {{-- نمایش خطاهای اعتبارسنجی --}}
                    @if($errors->any())
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <ul class="list-disc list-inside">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    {{-- فرم ویرایش --}}
                    <form method="POST" action="{{ route('admin.tours.update', $tour) }}">
                        @csrf
                        @method('PUT')  {{-- مهم: برای update باید متد PUT/PATCH باشد --}}

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {{-- عنوان --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">عنوان تور</label>
                                <input type="text" name="title" value="{{ old('title', $tour->title) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                @error('title') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- قیمت --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">قیمت (تومان)</label>
                                <input type="number" name="price" value="{{ old('price', $tour->price) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                @error('price') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- موقعیت --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">موقعیت</label>
                                <input type="text" name="location" value="{{ old('location', $tour->location) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                @error('location') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- حداکثر ظرفیت --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">حداکثر ظرفیت</label>
                                <input type="number" name="max_capacity" value="{{ old('max_capacity', $tour->max_capacity) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                @error('max_capacity') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- تاریخ شروع --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">تاریخ شروع</label>
                                <input type="date" name="start_date" value="{{ old('start_date', date('Y-m-d', strtotime($tour->start_date))) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                @error('start_date') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- تاریخ پایان --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">تاریخ پایان</label>
                                <input type="date" name="end_date" value="{{ old('end_date', date('Y-m-d', strtotime($tour->end_date))) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                                @error('end_date') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- آدرس تصویر (URL) --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">آدرس تصویر (URL)</label>
                                <input type="url" name="image_url" value="{{ old('image_url', $tour->image_url) }}"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                @error('image_url') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>

                            {{-- وضعیت فعال/غیرفعال --}}
                            <div>
                                <label class="block text-sm font-medium text-gray-700">وضعیت</label>
                                <select name="is_active" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value="1" {{ old('is_active', $tour->is_active) ? 'selected' : '' }}>فعال</option>
                                    <option value="0" {{ old('is_active', $tour->is_active) ? '' : 'selected' }}>غیرفعال</option>
                                </select>
                            </div>

                            {{-- توضیحات (تمام عرض) --}}
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">توضیحات</label>
                                <textarea name="description" rows="6" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>{{ old('description', $tour->description) }}</textarea>
                                @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                            </div>
                        </div>

                        {{-- دکمه‌های ارسال و انصراف --}}
                        <div class="mt-6 flex justify-end space-x-4 space-x-reverse">
                            <a href="{{ route('admin.tours.index') }}" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
                                انصراف
                            </a>
                            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                بروزرسانی تور
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
