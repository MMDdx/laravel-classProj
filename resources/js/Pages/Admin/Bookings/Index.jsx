import { router, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';

export default function AdminBookingsIndex({ bookings }) {
    const { flash } = usePage().props;

    const destroy = (id) => {
        if (confirm('حذف رزرو؟')) {
            router.delete(route('admin.bookings.destroy', id));
        }
    };

    const statusBadge = (status) => {
        const map = {
            confirmed: { bg: 'bg-green-100 text-green-800', label: 'تأیید شده' },
            cancelled: { bg: 'bg-red-100 text-red-800', label: 'لغو شده' },
            pending: { bg: 'bg-yellow-100 text-yellow-800', label: 'در انتظار' },
        };
        const s = map[status] || map.pending;
        return <span className={`px-2 py-1 text-xs rounded-full ${s.bg}`}>{s.label}</span>;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">مدیریت رزروها</h2>
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
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">شناسه</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">کاربر</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تور</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تعداد نفرات</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">قیمت کل</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.data.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.tour.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.number_of_people}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{Number(booking.total_price).toLocaleString()} تومان</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {statusBadge(booking.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Link href={route('admin.bookings.show', booking)} className="text-indigo-600 hover:underline">
                                                    ویرایش
                                                </Link>
                                                <button
                                                    onClick={() => destroy(booking.id)}
                                                    className="text-red-600 hover:underline mr-2"
                                                >
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={bookings.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
