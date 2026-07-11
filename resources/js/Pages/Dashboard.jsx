import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ totalBookings, confirmedBookings, activeToursCount, recentBookings, userName }) {
    const statusLabel = (s) => s === 'confirmed' ? 'تأیید شده' : s === 'cancelled' ? 'لغو شده' : 'در انتظار';
    const statusClass = (s) => s === 'confirmed' ? 'bg-green-100 text-green-700' : s === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';

    return (
        <DashboardLayout header="داشبورد">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">خوش آمدید، {userName} 👋</h1>
                <p className="text-gray-500 mt-1">از آخرین فعالیت‌های خود مطلع شوید</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm">کل رزروها</p>
                            <p className="text-3xl font-bold">{totalBookings}</p>
                        </div>
                        <i className="fas fa-calendar-check text-4xl text-blue-200"></i>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm">رزروهای تأیید شده</p>
                            <p className="text-3xl font-bold">{confirmedBookings}</p>
                        </div>
                        <i className="fas fa-check-circle text-4xl text-green-200"></i>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-indigo-100 text-sm">تورهای فعال</p>
                            <p className="text-3xl font-bold">{activeToursCount}</p>
                        </div>
                        <i className="fas fa-umbrella-beach text-4xl text-indigo-200"></i>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">آخرین رزروهای شما</h2>
                    <Link href={route('bookings.index')} className="text-indigo-600 text-sm hover:underline">مشاهده همه</Link>
                </div>
                <div className="p-6">
                    {recentBookings.length > 0 ? (
                        <div className="space-y-3">
                            {recentBookings.map(b => (
                                <div key={b.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                                    <div>
                                        <p className="font-semibold">{b.tour.title}</p>
                                        <p className="text-sm text-gray-500">{b.number_of_people} نفر - {Number(b.total_price).toLocaleString()} تومان</p>
                                    </div>
                                    <span className={`text-sm px-3 py-1 rounded-full ${statusClass(b.status)}`}>
                                        {statusLabel(b.status)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            هیچ رزروی ندارید. برای رزرو به <Link href={route('tours.index')} className="text-indigo-600">صفحه تورها</Link> بروید.
                        </p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
