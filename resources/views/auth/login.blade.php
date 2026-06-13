<x-guest-layout>
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">ورود به حساب</h2>
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input type="email" name="email" value="{{ old('email') }}" required autofocus
                   class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            @error('email') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input type="password" name="password" required
                   class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            @error('password') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
        </div>
        <div class="flex items-center justify-between mb-6">
            <label class="flex items-center">
                <input type="checkbox" name="remember" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span class="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
            </label>
            @if (Route::has('password.request'))
                <a href="{{ route('password.request') }}" class="text-sm text-indigo-600 hover:underline">رمز عبور را فراموش کرده‌اید؟</a>
            @endif
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">ورود</button>
        <p class="text-center text-gray-500 text-sm mt-4">حساب کاربری ندارید؟ <a href="{{ route('register') }}" class="text-indigo-600 hover:underline">ثبت‌نام کنید</a></p>
    </form>
</x-guest-layout>
