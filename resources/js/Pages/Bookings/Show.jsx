import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';

export default function BookingShow({ booking }) {
    const statusLabel = (s) => s === 'confirmed' ? 'تایید شده' : s === 'cancelled' ? 'لغو شده' : 'در انتظار تایید';
    const statusColor = (s) => s === 'confirmed' ? 'text-green-600' : s === 'cancelled' ? 'text-red-600' : 'text-yellow-600';

    const cancel = () => {
        if (confirm('لغو رزرو؟')) {
            router.patch(route('bookings.cancel', booking));
        }
    };

    return (
        <DashboardLayout header="جزئیات رزرو">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-lg font-bold">{booking.tour.title}</h3>
                            <p className="text-gray-600 mt-1">{booking.tour.location}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><span className="font-semibold">تعداد نفرات:</span> {booking.number_of_people}</div>
                            <div><span className="font-semibold">قیمت کل:</span> {Number(booking.total_price).toLocaleString()} تومان</div>
                            <div><span className="font-semibold">وضعیت:</span> <span className={statusColor(booking.status)}>{statusLabel(booking.status)}</span></div>
                            <div><span className="font-semibold">تاریخ رزرو:</span> {booking.booking_date}</div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <Link href={route('bookings.index')} className="text-indigo-600 hover:underline">← بازگشت به رزروهای من</Link>
                            {booking.status === 'pending' && (
                                <button onClick={cancel} className="text-red-600 hover:underline">لغو رزرو</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
