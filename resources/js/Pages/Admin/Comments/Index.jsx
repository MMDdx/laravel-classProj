import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function AdminCommentsIndex({ comments }) {
    const approve = (comment) => {
        router.patch(route('admin.comments.approve', comment), {}, {
            preserveScroll: true,
        });
    };

    const destroy = (comment) => {
        if (confirm('آیا از حذف این نظر اطمینان دارید؟')) {
            router.delete(route('admin.comments.destroy', comment), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">مدیریت نظرات</h1>

                {comments.data.length > 0 ? (
                    <div className="space-y-4">
                        {comments.data.map(comment => (
                            <div key={comment.id} className={`bg-white rounded-xl shadow p-5 border-r-4 ${
                                comment.is_approved ? 'border-green-500' : 'border-yellow-500'
                            }`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-gray-800 mb-2">{comment.content}</p>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span>کاربر: {comment.user?.name}</span>
                                            <span>تور: {comment.tour?.title}</span>
                                            <span className={comment.is_approved ? 'text-green-600 font-bold' : 'text-yellow-600 font-bold'}>
                                                {comment.is_approved ? 'تأیید شده' : 'در انتظار تأیید'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mr-4">
                                        {!comment.is_approved && (
                                            <button onClick={() => approve(comment)}
                                                    className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition">
                                                تأیید
                                            </button>
                                        )}
                                        <button onClick={() => destroy(comment)}
                                                className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition">
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
                        هیچ نظری وجود ندارد.
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
