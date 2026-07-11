import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';

export default function BookingsIndex({ bookings }) {
    const statusLabel = (s) => s === 'confirmed' ? 'تایید شده' : s === 'cancelled' ? 'لغو شده' : 'در انتظار تایید';
    const statusColor = (s) => s === 'confirmed' ? 'text-green-600' : s === 'cancelled' ? 'text-red-600' : 'text-yellow-600';

    const cancel = (id) => {
        if (confirm('لغو رزرو؟')) {
            router.patch(route('bookings.cancel', id));
        }
    };

    return (
        <DashboardLayout header="رزروهای من">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    {bookings.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">تور</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">تعداد نفرات</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">قیمت کل</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">وضعیت</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">تاریخ رزرو</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bookings.data.map(b => (
                                        <tr key={b.id} className="border-b">
                                            <td className="px-6 py-4">{b.tour.title}</td>
                                            <td className="px-6 py-4">{b.number_of_people}</td>
                                            <td className="px-6 py-4">{Number(b.total_price).toLocaleString()} تومان</td>
                                            <td className="px-6 py-4"><span className={statusColor(b.status)}>{statusLabel(b.status)}</span></td>
                                            <td className="px-6 py-4">{b.booking_date}</td>
                                            <td className="px-6 py-4">
                                                <Link href={route('bookings.show', b)} className="text-indigo-600 hover:underline">جزئیات</Link>
                                                {b.status === 'pending' && (
                                                    <button onClick={() => cancel(b.id)} className="text-red-600 hover:underline mr-2">لغو</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">
                            هیچ رزروی ندارید. برای رزرو به <Link href={route('tours.index')} className="text-indigo-600">لیست تورها</Link> بروید.
                        </p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
