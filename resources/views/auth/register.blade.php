<x-guest-layout>
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">ثبت‌نام در تورلی</h2>
    <form method="POST" action="{{ route('register') }}">
        @csrf
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">نام کامل</label>
            <input type="text" name="name" value="{{ old('name') }}" required autofocus
                   class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input type="email" name="email" value="{{ old('email') }}" required
                   class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            @error('email') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input type="password" name="password" required
                   class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            @error('password') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور</label>
            <input type="password" name="password_confirmation" required
                   class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">ثبت‌نام</button>
        <p class="text-center text-gray-500 text-sm mt-4">قبلاً ثبت‌نام کرده‌اید؟ <a href="{{ route('login') }}" class="text-indigo-600 hover:underline">وارد شوید</a></p>
    </form>
</x-guest-layout>
