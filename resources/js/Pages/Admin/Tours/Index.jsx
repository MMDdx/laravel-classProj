import { router, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import JalaliDateInput from '@/Components/JalaliDateInput';

export default function AdminToursIndex({ tours }) {
    const { flash } = usePage().props || {};

    const destroy = (id) => {
        if (confirm('آیا مطمئنید؟')) {
            router.delete(route('admin.tours.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        مدیریت تورها
                    </h2>
                    <Link
                        href={route('admin.tours.create')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        ایجاد تور جدید
                    </Link>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {flash.success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {flash.success}
                                </div>
                            )}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عنوان</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاریخ شروع</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">موقعیت</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ظرفیت</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {tours.data.map((tour) => (
                                        <tr key={tour}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{tour.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{Number(tour.price).toLocaleString()} تومان</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {tour.start_date_jalali || tour.start_date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{tour.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{tour.max_capacity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {tour.is_active ? (
                                                    <span className="text-green-600">فعال</span>
                                                ) : (
                                                    <span className="text-red-600">غیرفعال</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                                                <Link href={route('admin.tours.edit', tour)} className="text-indigo-600 hover:text-indigo-900">
                                                    ویرایش
                                                </Link>
                                                <button
                                                    onClick={() => destroy(tour)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={tours.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
