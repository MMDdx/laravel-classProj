import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post(route('login'), data, {
            onFinish: () => setProcessing(false),
            onError: (err) => setErrors(err),
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <GuestLayout>
            <Head title="ورود" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    {status}
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Side Panel - Decorative */}
                    <div className="hidden lg:flex lg:col-span-2 hero-gradient flex-col justify-between p-10 text-white">
                        <div>
                            <h2 className="text-2xl font-bold mb-3">خوش آمدید!</h2>
                            <p className="text-blue-100 leading-relaxed">
                                به سامانه رزرو تور خوش آمدید. با ورود به حساب کاربری خود می‌توانید تورهای مورد علاقه‌تان را رزرو کرده و رزروهای خود را مدیریت کنید.
                            </p>
                        </div>
                        <div className="space-y-4 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-blue-100">رزرو آسان و سریع تورها</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-blue-100">مشاهده قیمت‌ها و ظرفیت به‌روز</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-sm text-blue-100">مدیریت رزروهای خود</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">ورود به حساب</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">اطلاعات خود را وارد کنید</p>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    ایمیل
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    autoComplete="username"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    رمز عبور
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                                    placeholder="••••••••"
                                    dir="ltr"
                                    autoComplete="current-password"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">مرا به خاطر بسپار</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
                                    >
                                        فراموشی رمز عبور؟
                                    </Link>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        در حال ورود...
                                    </span>
                                ) : (
                                    'ورود'
                                )}
                            </button>
                        </form>

                        {/* General Error */}
                        {errors.general && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                            </div>
                        )}

                        {/* Register Link */}
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            حساب کاربری ندارید؟{' '}
                            <Link href={route('register')} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition">
                                ثبت‌نام کنید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
