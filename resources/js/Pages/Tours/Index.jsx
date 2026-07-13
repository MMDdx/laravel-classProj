import PublicLayout from '@/Layouts/PublicLayout';
import { Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ToursIndex({ tours, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        location: filters.location || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        sort: filters.sort || 'start_date',
        direction: filters.direction || 'asc',
    });

    const submit = (e) => {
        e.preventDefault();
        let sortVal = data.sort;
        let dir = data.direction;
        if (sortVal === 'price_desc') {
            sortVal = 'price';
            dir = 'desc';
        }
        get(route('tours.index'), {
            ...data,
            sort: sortVal,
            direction: dir,
        });
    };

    const getPageLabel = (label, index, total) => {
        const cleaned = label
            .replace(/&laquo;/g, '')
            .replace(/&raquo;/g, '')
            .replace(/&lsaquo;/g, '')
            .replace(/&rsaquo;/g, '')
            .trim();
        if (index === 0) return 'قبلی';
        if (index === total - 1) return 'بعدی';
        return cleaned;
    };

    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">همه تورها</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">جستجو و فیلتر</h3>
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">جستجوی عنوان</label>
                                    <input type="text" value={data.search}
                                           onChange={e => setData('search', e.target.value)}
                                           placeholder="مثلاً: کیش"
                                           className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">مکان</label>
                                    <input type="text" value={data.location}
                                           onChange={e => setData('location', e.target.value)}
                                           placeholder="شهر یا کشور"
                                           className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">بازه قیمت (تومان)</label>
                                    <div className="flex gap-2">
                                        <input type="number" value={data.min_price}
                                               onChange={e => setData('min_price', e.target.value)}
                                               placeholder="حداقل"
                                               className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                                        <input type="number" value={data.max_price}
                                               onChange={e => setData('max_price', e.target.value)}
                                               placeholder="حداکثر"
                                               className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">از تاریخ شروع</label>
                                    <input type="date" value={data.start_date}
                                           onChange={e => setData('start_date', e.target.value)}
                                           className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">تا تاریخ پایان</label>
                                    <input type="date" value={data.end_date}
                                           onChange={e => setData('end_date', e.target.value)}
                                           className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">مرتب‌سازی</label>
                                    <select value={data.sort}
                                            onChange={e => {
                                                if (e.target.value === 'price_desc') {
                                                    setData('sort', 'price_desc');
                                                } else {
                                                    setData('sort', e.target.value);
                                                    setData('direction', 'asc');
                                                }
                                            }}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                        <option value="start_date">تاریخ شروع (قدیمی‌تر)</option>
                                        <option value="price">قیمت (کمترین)</option>
                                        <option value="price_desc">قیمت (بیشترین)</option>
                                        <option value="title">عنوان</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit"
                                            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition w-full font-medium">
                                        اعمال فیلتر
                                    </button>
                                    <Link href={route('tours.index')}
                                          className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition text-center font-medium">
                                        لغو
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Tour Cards */}
                    <div className="lg:w-3/4">
                        {tours.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {tours.data.map(tour => (
                                        <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                                            <img src={tour.image_url || 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=400&h=250&fit=crop'}
                                                 alt={tour.title} className="w-full h-48 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
                                                <div className="flex items-center text-gray-500 text-sm mt-1">
                                                    <svg className="w-4 h-4 ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{tour.location}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <span className="text-blue-600 font-bold">{Number(tour.price).toLocaleString()} تومان</span>
                                                </div>
                                                <Link href={route('tours.show', tour)}
                                                      className="mt-4 inline-block w-full text-center bg-blue-50 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                                                    مشاهده جزئیات
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination — Farsi */}
                                {tours.links && tours.links.length > 3 && (
                                    <div className="mt-10 flex items-center justify-center gap-1">
                                        {tours.links.map((link, i) => {
                                            const label = getPageLabel(link.label, i, tours.links.length);
                                            return link.url ? (
                                                <button
                                                    key={i}
                                                    onClick={() => router.get(link.url)}
                                                    className={`px-3.5 py-1.5 text-sm rounded-lg border transition ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {label}
                                                </button>
                                            ) : (
                                                <span
                                                    key={i}
                                                    className="px-3.5 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                                >
                                                    {label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-700">هیچ توری با این مشخصات یافت نشد</h3>
                                <Link href={route('tours.index')} className="inline-block mt-4 text-blue-600 hover:underline font-medium">
                                    نمایش همه تورها
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
