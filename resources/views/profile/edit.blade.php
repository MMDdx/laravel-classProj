<x-app-layout>
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6">ویرایش پروفایل</h2>
            @if(session('status') === 'profile-updated')
                <div class="mb-4 p-3 bg-green-100 text-green-700 rounded">پروفایل با موفقیت به‌روزرسانی شد.</div>
            @endif
            <form method="POST" action="{{ route('profile.update') }}">
                @csrf @method('PATCH')
                <div class="mb-4">
                    <label class="block text-sm font-medium">نام</label>
                    <input type="text" name="name" value="{{ old('name', Auth::user()->name) }}" class="w-full rounded-lg border-gray-300">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">ایمیل</label>
                    <input type="email" name="email" value="{{ old('email', Auth::user()->email) }}" class="w-full rounded-lg border-gray-300">
                </div>
                <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg">ذخیره تغییرات</button>
            </form>
        </div>

        <div class="mt-6 bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6">تغییر رمز عبور</h2>
            <form method="POST" action="{{ route('password.update') }}">
                @csrf @method('PUT')
                <div class="mb-4">
                    <label class="block text-sm font-medium">رمز عبور فعلی</label>
                    <input type="password" name="current_password" class="w-full rounded-lg border-gray-300">
                    @error('current_password') <p class="text-red-500 text-xs">{{ $message }}</p> @enderror
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">رمز عبور جدید</label>
                    <input type="password" name="password" class="w-full rounded-lg border-gray-300">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">تکرار رمز عبور جدید</label>
                    <input type="password" name="password_confirmation" class="w-full rounded-lg border-gray-300">
                </div>
                <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg">تغییر رمز</button>
            </form>
        </div>
    </div>
</x-app-layout>
