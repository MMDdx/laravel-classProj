import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post(route('register'), data, {
            onFinish: () => setProcessing(false),
            onError: (err) => setErrors(err),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <GuestLayout>
            <Head title="ثبت‌نام" />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Side Panel - Decorative */}
                    <div className="hidden lg:flex lg:col-span-2 hero-gradient flex-col justify-between p-10 text-white">
                        <div>
                            <h2 className="text-2xl font-bold mb-3">عضویت در سایت</h2>
                            <p className="text-blue-100 leading-relaxed">
                                با ایجاد حساب کاربری، می‌توانید تورهای متنوع را مشاهده کرده و به راحتی رزرو کنید. همچنین از آخرین تخفیف‌ها و تورهای جدید باخبر شوید.
                            </p>
                        </div>
                        <div className="space-y-4 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-blue-100">دسترسی به تورهای اختصاصی</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-blue-100">پشتیبانی ۲۴ ساعته</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-blue-100">پرداخت امن و مطمئن</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">ایجاد حساب جدید</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">اطلاعات خود را وارد کنید</p>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    نام و نام خانوادگی
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                                    placeholder="علی محمدی"
                                    autoComplete="name"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

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
                                    placeholder="حداقل ۸ کاراکتر"
                                    dir="ltr"
                                    autoComplete="new-password"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    تأیید رمز عبور
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                                    placeholder="رمز عبور را دوباره وارد کنید"
                                    dir="ltr"
                                    autoComplete="new-password"
                                    required
                                />
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
                                        در حال ثبت‌نام...
                                    </span>
                                ) : (
                                    'ثبت‌نام'
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            قبلاً ثبت‌نام کرده‌اید؟{' '}
                            <Link href={route('login')} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition">
                                وارد شوید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
