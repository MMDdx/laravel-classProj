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
                                           className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">مکان</label>
                                    <input type="text" value={data.location}
                                           onChange={e => setData('location', e.target.value)}
                                           placeholder="شهر یا کشور"
                                           className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">بازه قیمت (تومان)</label>
                                    <div className="flex gap-2">
                                        <input type="number" value={data.min_price}
                                               onChange={e => setData('min_price', e.target.value)}
                                               placeholder="حداقل"
                                               className="w-1/2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                        <input type="number" value={data.max_price}
                                               onChange={e => setData('max_price', e.target.value)}
                                               placeholder="حداکثر"
                                               className="w-1/2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">از تاریخ شروع</label>
                                    <input type="date" value={data.start_date}
                                           onChange={e => setData('start_date', e.target.value)}
                                           className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">تا تاریخ پایان</label>
                                    <input type="date" value={data.end_date}
                                           onChange={e => setData('end_date', e.target.value)}
                                           className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
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
                                            className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                        <option value="start_date">تاریخ شروع (قدیمی‌تر)</option>
                                        <option value="price">قیمت (کمترین)</option>
                                        <option value="price_desc">قیمت (بیشترین)</option>
                                        <option value="title">عنوان</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full">
                                        اعمال فیلتر
                                    </button>
                                    <Link href={route('tours.index')}
                                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-center">
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
                                                    <i className="fas fa-map-marker-alt ml-1 text-indigo-500"></i>
                                                    <span>{tour.location}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <span className="text-indigo-600 font-bold">{Number(tour.price).toLocaleString()} تومان</span>
                                                </div>
                                                <Link href={route('tours.show', tour)}
                                                      className="mt-4 inline-block w-full text-center bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition">
                                                    مشاهده جزئیات
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                {tours.links && (
                                    <div className="mt-10 flex justify-center gap-1">
                                        {tours.links.map((link, i) => (
                                            link.url ? (
                                                <button key={i} onClick={() => router.get(link.url)}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className={`px-3 py-1 rounded ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} border`}
                                                />
                                            ) : (
                                                <span key={i} className="px-3 py-1 text-gray-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                                            )
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <i className="fas fa-search text-5xl text-gray-400 mb-4"></i>
                                <h3 className="text-xl font-semibold text-gray-700">هیچ توری با این مشخصات یافت نشد</h3>
                                <Link href={route('tours.index')} className="inline-block mt-4 text-indigo-600 hover:underline">
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
