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

            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">ایجاد حساب</h1>
                        <p className="text-gray-500 mt-1 text-sm">اطلاعات خود را وارد کنید</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="علی محمدی"
                                autoComplete="name"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="example@email.com"
                                dir="ltr"
                                autoComplete="username"
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="حداقل ۸ کاراکتر"
                                dir="ltr"
                                autoComplete="new-password"
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">تأیید رمز عبور</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="رمز عبور را دوباره وارد کنید"
                                dir="ltr"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
                        >
                            {processing ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                        </button>
                    </form>
                </div>

                <p className="mt-4 text-center text-sm text-gray-500">
                    قبلاً ثبت‌نام کرده‌اید؟{' '}
                    <Link href={route('login')} className="text-blue-600 hover:text-blue-700 font-medium">
                        وارد شوید
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
