import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

function CommentAvatar({ user, size = 'w-8 h-8', textSize = 'text-sm' }) {
    const avatarUrl = user?.profile_photo_path
        ? `/storage/${user.profile_photo_path}`
        : null;

    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt={user?.name || 'کاربر'}
                className={`${size} rounded-full object-cover border-2 border-blue-200`}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
        );
    }

    return (
        <div className={`${size} bg-blue-100 rounded-full flex items-center justify-center`}>
            <span className={`${textSize} text-blue-600 font-bold`}>
                {user?.name ? user.name.charAt(0) : '?'}
            </span>
        </div>
    );
}

export default function Show({ tour, comments = [], userBooking = null }) {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;

    const [form, setForm] = useState({ number_of_people: 1 });
    const [commentForm, setCommentForm] = useState({ content: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [commentProcessing, setCommentProcessing] = useState(false);
    const [commentErrors, setCommentErrors] = useState({});
    const [visibleCount, setVisibleCount] = useState(5);

    if (!tour) {
        return (
            <PublicLayout>
                <Head title="تور یافت نشد" />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <p className="text-gray-500 text-lg">تور مورد نظر یافت نشد.</p>
                    <Link href={route('tours.index')} className="mt-4 inline-block text-blue-600 hover:underline font-medium">
                        بازگشت به لیست تورها
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post(route('bookings.store', { tour: tour.id }), {
            ...form,
            tour_id: tour.id,
        }, {
            onSuccess: () => { setForm({ number_of_people: 1 }); setErrors({}); },
            onError: (err) => setErrors(err),
            onFinish: () => setProcessing(false),
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setCommentProcessing(true);
        router.post(route('comments.store', { tour: tour.slug }), {
            content: commentForm.content,
        }, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => { setCommentForm({ content: '' }); setCommentErrors({}); },
            onError: (err) => setCommentErrors(err),
            onFinish: () => setCommentProcessing(false),
        });
    };

    const visibleComments = comments.slice(0, visibleCount);
    const hasMore = comments.length > visibleCount;
    const remainingCount = comments.length - visibleCount;

    return (
        <PublicLayout>
            <Head title={tour.title || 'جزئیات تور'} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href={route('tours.index')} className="hover:text-blue-600 transition">تورها</Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-gray-800 font-medium">{tour.title}</span>
                </div>

                {/* Hero Image */}
                {tour.image_url && (
                    <div className="h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden mb-8 relative">
                        <img src={'/' + tour.image_url} alt={tour.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-6 right-6 left-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-white">{tour.title}</h1>
                            <div className="flex items-center gap-4 text-white/80 text-sm mt-2">
                                {tour.location && (
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {tour.location}
                                    </span>
                                )}
                                {tour.duration && <span>مدت: {tour.duration}</span>}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Info Cards */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">اطلاعات تور</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {tour.price != null && (
                                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                                        <p className="text-sm text-blue-600 mb-1">قیمت</p>
                                        <p className="text-lg md:text-xl font-bold text-blue-700 leading-tight">
                                            {Number(tour.price).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-blue-500 mt-0.5">تومان</p>
                                    </div>
                                )}
                                {tour.max_capacity != null && (
                                    <div className="bg-green-50 rounded-xl p-4 text-center">
                                        <p className="text-sm text-green-600 mb-1">ظرفیت</p>
                                        <p className="text-lg md:text-xl font-bold text-green-700 leading-tight">
                                            {tour.remaining_capacity ?? tour.max_capacity}
                                            <span className="text-sm font-normal mr-0.5">/ {tour.max_capacity}</span>
                                        </p>
                                        <p className="text-xs text-green-500 mt-0.5">نفر</p>
                                    </div>
                                )}
                                {tour.start_date && (
                                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                                        <p className="text-sm text-purple-600 mb-1">تاریخ شروع</p>
                                        <p className="text-base font-bold text-purple-700 leading-tight">{tour.start_date_jalali || tour.start_date}</p>
                                    </div>
                                )}
                                {tour.end_date && (
                                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                                        <p className="text-sm text-orange-600 mb-1">تاریخ پایان</p>
                                        <p className="text-base font-bold text-orange-700 leading-tight">{tour.end_date_jalali || tour.end_date}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        {tour.description && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">توضیحات</h2>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{tour.description}</div>
                            </div>
                        )}

                        {/* Itinerary */}
                        {tour.itinerary && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">برنامه سفر</h2>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{tour.itinerary}</div>
                            </div>
                        )}

                        {/* Includes */}
                        {tour.includes && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">خدمات شامل</h2>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{tour.includes}</div>
                            </div>
                        )}

                        {/* ===== Comments Section ===== */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <h2 className="text-xl font-bold text-gray-800">نظرات کاربران</h2>
                                {comments.length > 0 && (
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                        {comments.length}
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                {/* Comments List */}
                                {comments.length > 0 ? (
                                    <div className="space-y-4 mb-6">
                                        {visibleComments.map((comment) => (
                                            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CommentAvatar user={comment.user} />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-800">{comment.user?.name || 'کاربر'}</span>
                                                        <span className="text-xs text-gray-400 mr-2">{comment.created_at_jalali || comment.created_at}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed pr-10">{comment.content}</p>
                                            </div>
                                        ))}

                                        {/* Show More Button */}
                                        {hasMore && (
                                            <button
                                                type="button"
                                                onClick={() => setVisibleCount(prev => prev + 5)}
                                                className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition"
                                            >
                                                نمایش {remainingCount > 5 ? '۵' : remainingCount} نظر بعدی
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm text-center py-4">هنوز نظری ثبت نشده است. اولین نفر باشید!</p>
                                )}

                                {/* Divider */}
                                <div className="border-t border-gray-200 my-4"></div>

                                {/* Comment Form */}
                                {isLoggedIn ? (
                                    <form onSubmit={handleCommentSubmit} className="space-y-3">
                                        <textarea
                                            value={commentForm.content}
                                            onChange={(e) => setCommentForm({ content: e.target.value })}
                                            rows={3}
                                            placeholder="نظر خود را بنویسید..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                                            required
                                        />
                                        {commentErrors.content && (
                                            <p className="text-sm text-red-500">{commentErrors.content}</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={commentProcessing}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition disabled:opacity-50"
                                        >
                                            {commentProcessing ? 'در حال ارسال...' : 'ارسال نظر'}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500">
                                            برای ثبت نظر{' '}
                                            <Link href={route('login')} className="text-blue-600 hover:underline font-medium">وارد شوید</Link>
                                            {' '}یا{' '}
                                            <Link href={route('register')} className="text-blue-600 hover:underline font-medium">ثبت‌نام</Link>
                                            {' '}کنید.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">رزرو تور</h3>

                            {tour.is_active === false ? (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                    <p className="text-red-600 font-medium">این تور در حال حاضر غیرفعال است.</p>
                                </div>
                            ) : (tour.remaining_capacity != null && tour.remaining_capacity <= 0) ? (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                                    <p className="text-yellow-600 font-medium">ظرفیت این تور تکمیل شده است.</p>
                                </div>
                            ) : userBooking ? (
                                <div className="space-y-4">
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center space-y-3">
                                        <div className="flex justify-center">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-green-700 font-bold text-sm">شما این تور را رزرو کرده‌اید!</p>
                                        <div className="text-green-600 text-sm space-y-1">
                                            <p>{userBooking.number_of_people} نفر</p>
                                            <p>{Number(userBooking.total_price).toLocaleString('fa-IR')} تومان</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('bookings.show', userBooking.id)}
                                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
                                    >
                                        مشاهده جزئیات رزرو
                                    </Link>
                                </div>
                            ) : isLoggedIn ? (
                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد نفرات</label>
                                        <div className="relative">
                                            <select
                                                value={String(form.number_of_people)}
                                                onChange={(e) => setForm({ ...form, number_of_people: parseInt(e.target.value) || 1 })}
                                                className="w-full appearance-none pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
                                            >
                                                {Array.from({ length: Math.min(tour.remaining_capacity || tour.max_capacity || 10, 10) }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={String(num)}>{num} نفر</option>
                                                ))}
                                            </select>
                                            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {errors.number_of_people && <p className="mt-1 text-sm text-red-500">{errors.number_of_people}</p>}
                                    </div>

                                    {tour.price != null && (
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500 mb-1">مبلغ کل:</p>
                                            <p className="text-2xl font-bold text-blue-600 leading-tight">
                                                {(Number(tour.price) * form.number_of_people).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">تومان</p>
                                        </div>
                                    )}

                                    <button type="submit" disabled={processing}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50">
                                        {processing ? 'در حال ثبت...' : 'ثبت رزرو'}
                                    </button>
                                    {errors.general && <p className="text-sm text-red-500 text-center mt-2">{errors.general}</p>}
                                </form>
                            ) : (
                                <div className="text-center space-y-3">
                                    <p className="text-gray-500 text-sm">برای رزرو تور ابتدا وارد شوید.</p>
                                    <Link href={route('login')} className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-center transition">ورود</Link>
                                    <Link href={route('register')} className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-center transition">ثبت‌نام</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-8">
                    <Link href={route('tours.index')} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        بازگشت به لیست تورها
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
