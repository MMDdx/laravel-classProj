import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminBookingsShow({ booking }) {
    const { errors } = usePage().props;

    const { data, setData, put, processing } = useForm({
        status: booking.status || 'pending',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.bookings.update', booking.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ویرایش رزرو #{booking.id}
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-4">
                                <p><strong>کاربر:</strong> {booking.user.name} ({booking.user.email})</p>
                                <p><strong>تور:</strong> {booking.tour.title}</p>
                                <p><strong>تعداد نفرات:</strong> {booking.number_of_people}</p>
                                <p><strong>قیمت کل:</strong> {Number(booking.total_price).toLocaleString()} تومان</p>
                            </div>

                            {errors.status && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {errors.status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">وضعیت</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full rounded-lg border-gray-300"
                                    >
                                        <option value="pending">در انتظار</option>
                                        <option value="confirmed">تأیید شده</option>
                                        <option value="cancelled">لغو شده</option>
                                    </select>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                    >
                                        {processing ? 'در حال ذخیره...' : 'به‌روزرسانی'}
                                    </button>
                                    <Link
                                        href={route('admin.bookings.index')}
                                        className="bg-gray-300 px-4 py-2 rounded-lg"
                                    >
                                        بازگشت
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
