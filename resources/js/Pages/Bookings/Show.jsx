import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';

export default function BookingShow({ booking }) {
    const statusLabel = (s) => s === 'confirmed' ? 'تایید شده' : s === 'cancelled' ? 'لغو شده' : 'در انتظار تایید';
    const statusBg = (s) => s === 'confirmed' ? 'bg-green-50 border-green-200' : s === 'cancelled' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200';
    const statusColor = (s) => s === 'confirmed' ? 'text-green-700' : s === 'cancelled' ? 'text-red-700' : 'text-yellow-700';
    const statusDot = (s) => s === 'confirmed' ? 'bg-green-500' : s === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500';

    const cancel = () => {
        if (confirm('لغو رزرو؟')) {
            router.patch(route('bookings.cancel', booking));
        }
    };

    return (
        <DashboardLayout header="جزئیات رزرو">
            <div className="max-w-3xl mx-auto py-6 space-y-6">

                {/* Tour Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {booking.tour.image_url && (
                        <div className="h-48 bg-gray-200">
                            <img
                                src={'/' + booking.tour.image_url}
                                alt={booking.tour.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <Link
                                    href={route('tours.show', booking.tour)}
                                    className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
                                >
                                    {booking.tour.title}
                                </Link>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{booking.tour.location}</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusBg(booking.status)}`}>
                                <div className={`w-2 h-2 rounded-full ${statusDot(booking.status)}`}></div>
                                <span className={`text-sm font-medium ${statusColor(booking.status)}`}>
                                    {statusLabel(booking.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-gray-800">اطلاعات رزرو</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-blue-50 rounded-xl p-4">
                                <p className="text-xs text-blue-600 mb-1">تعداد نفرات</p>
                                <p className="text-2xl font-bold text-blue-700">{booking.number_of_people}</p>
                                <p className="text-xs text-blue-500 mt-0.5">نفر</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4">
                                <p className="text-xs text-green-600 mb-1">قیمت کل</p>
                                <p className="text-2xl font-bold text-green-700 leading-tight">
                                    {Number(booking.total_price).toLocaleString()}
                                </p>
                                <p className="text-xs text-green-500 mt-0.5">تومان</p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4">
                                <p className="text-xs text-purple-600 mb-1">قیمت هر نفر</p>
                                <p className="text-lg font-bold text-purple-700 leading-tight">
                                    {Number(booking.tour.price).toLocaleString()}
                                </p>
                                <p className="text-xs text-purple-500 mt-0.5">تومان</p>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-4">
                                <p className="text-xs text-orange-600 mb-1">تاریخ رزرو</p>
                                <p className="text-lg font-bold text-orange-700 leading-tight">
                                    {booking.booking_date_jalali || booking.booking_date}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('bookings.index')}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        بازگشت به رزروهای من
                    </Link>

                    {booking.status === 'pending' || booking.status === "" && (
                        <button
                            onClick={cancel}
                            className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 px-4 rounded-lg border border-red-200 transition"
                        >
                            لغو رزرو
                        </button>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
