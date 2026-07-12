import { router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';

export default function AdminUsersIndex({ users }) {
    const { flash } = usePage().props || {};
    const { auth } = usePage().props;

    const destroy = (id) => {
        if (confirm('آیا مطمئن هستید؟')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    مدیریت کاربران
                </h2>
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
                            {flash.error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {flash.error}
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">شناسه</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ایمیل</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نقش</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.length > 0 ? (
                                        users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {user.is_admin ? (
                                                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">مدیر</span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">کاربر عادی</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {(!user.is_admin || auth.user.id !== user.id) ? (
                                                        <button
                                                            onClick={() => destroy(user.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            حذف
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400">امکان حذف خود ندارید</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                هیچ کاربری یافت نشد
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={users.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
