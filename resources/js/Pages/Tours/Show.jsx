import { Link, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TourShow({ tour }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing } = useForm({
        tour_id: tour.id,
        number_of_people: 1,
    });

    const totalPrice = Number(tour.price) * (parseInt(data.number_of_people) || 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    const Layout = auth.user ? AuthenticatedLayout : ({ children }) => <>{children}</>;

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <Link href={route('tours.index')} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
                    بازگشت به لیست تورها
                </Link>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={tour.image_url || 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=800&h=500&fit=crop'}
                                alt={tour.title}
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800">{tour.title}</h1>
                            <div className="flex items-center mt-2 text-gray-500">
                                {tour.location}
                            </div>
                            <div className="mt-4 text-3xl font-bold text-indigo-600">
                                {Number(tour.price).toLocaleString()} <span className="text-lg">تومان</span>
                            </div>
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-700">توضیحات تور</h3>
                                <p className="text-gray-600 leading-relaxed mt-2">{tour.description}</p>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>ظرفیت: {tour.max_capacity} نفر</div>
                                <div>ظرفیت باقیمانده: {tour.remaining_capacity} نفر</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">رزرو تور</h2>

                    {auth.user ? (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        تعداد نفرات <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number" min="1" max={tour.remaining_capacity}
                                        value={data.number_of_people}
                                        onChange={e => setData('number_of_people', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">حداکثر: {tour.remaining_capacity} نفر</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">قیمت هر نفر</label>
                                    <input type="text" value={Number(tour.price).toLocaleString() + ' تومان'} readOnly className="w-full rounded-lg bg-gray-100 border-gray-200" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">قیمت کل</label>
                                    <input type="text" value={totalPrice.toLocaleString() + ' تومان'} readOnly className="w-full rounded-lg bg-gray-100 border-gray-200 font-bold text-indigo-700" />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button type="submit" disabled={processing} className="bg-indigo-600 text-white px-8 py-2 rounded-xl hover:bg-indigo-700 transition shadow-md disabled:opacity-50">
                                    ثبت رزرو
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-xl text-gray-600">برای رزرو تور وارد شوید</p>
                            <div className="mt-6 flex justify-center gap-4">
                                <Link href={route('login')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">ورود</Link>
                                <Link href={route('register')} className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg">ثبت‌نام</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
