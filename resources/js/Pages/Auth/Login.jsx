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

            <div className="max-w-md mx-auto">
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                        {status}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">ورود به حساب</h1>
                        <p className="text-gray-500 mt-1 text-sm">اطلاعات خود را وارد کنید</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
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
                                placeholder="••••••••"
                                dir="ltr"
                                autoComplete="current-password"
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-600">مرا به خاطر بسپار</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    فراموشی رمز؟
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
                        >
                            {processing ? 'در حال ورود...' : 'ورود'}
                        </button>
                    </form>

                    {errors.general && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{errors.general}</p>
                        </div>
                    )}
                </div>

                <p className="mt-4 text-center text-sm text-gray-500">
                    حساب ندارید؟{' '}
                    <Link href={route('register')} className="text-blue-600 hover:text-blue-700 font-medium">
                        ثبت‌نام
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
