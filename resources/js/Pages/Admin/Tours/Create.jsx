import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminToursCreate() {
    const { errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        title: '',
        price: '',
        location: '',
        max_capacity: '',
        start_date: '',
        end_date: '',
        image_url: '',
        is_active: true,
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tours.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ایجاد تور جدید
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">عنوان تور</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">قیمت (تومان)</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">موقعیت</label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">حداکثر ظرفیت</label>
                                        <input
                                            type="number"
                                            value={data.max_capacity}
                                            onChange={(e) => setData('max_capacity', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.max_capacity && <p className="text-red-500 text-xs mt-1">{errors.max_capacity}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">تاریخ شروع</label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">تاریخ پایان</label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">آدرس تصویر (URL)</label>
                                        <input
                                            type="url"
                                            value={data.image_url}
                                            onChange={(e) => setData('image_url', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">وضعیت</label>
                                        <select
                                            value={data.is_active ? '1' : '0'}
                                            onChange={(e) => setData('is_active', e.target.value === '1')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="1">فعال</option>
                                            <option value="0">غیرفعال</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">توضیحات</label>
                                        <textarea
                                            rows="5"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing ? 'در حال ذخیره...' : 'ذخیره تور'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
