import { Link, usePage } from '@inertiajs/react';

export default function DashboardLayout({ children, header }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-lg flex flex-col fixed inset-y-0 right-0 z-30 border-l border-gray-200 sidebar-scroll overflow-y-auto">
                <div className="p-6 border-b">
                    <Link href={route('dashboard')}
                          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        تورلی
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">پنل کاربری</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link href={route('dashboard')}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                        <i className="fas fa-tachometer-alt w-5"></i> <span>داشبورد</span>
                    </Link>
                    <Link href={route('tours.index')}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                        <i className="fas fa-map-marked-alt w-5"></i> <span>تورها</span>
                    </Link>
                    <Link href={route('bookings.index')}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                        <i className="fas fa-ticket-alt w-5"></i> <span>رزروهای من</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t">
                        <Link href={route('profile.edit')}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                            <i className="fas fa-user-circle w-5"></i> <span>پروفایل من</span>
                        </Link>
                    </div>
                    {auth.user?.is_admin && (
                        <div className="pt-4 mt-4 border-t">
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase">مدیریت</p>
                            <Link href={route('admin.users.index')}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition mt-1">
                                <i className="fas fa-users w-5"></i> <span>مدیریت کاربران</span>
                            </Link>
                            <Link href={route('admin.tours.index')}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                                <i className="fas fa-umbrella-beach w-5"></i> <span>مدیریت تورها</span>
                            </Link>
                            <Link href={route('admin.bookings.index')}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                                <i className="fas fa-clipboard-list w-5"></i> <span>مدیریت رزروها</span>
                            </Link>
                        </div>
                    )}
                </nav>
                <div className="p-4 border-t">
                    <Link href={route('logout')} method="post" as="button"
                          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
                        <i className="fas fa-sign-out-alt w-5"></i> <span>خروج</span>
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 mr-72">
                <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
                    <div className="text-gray-600 text-sm">
                        <i className="fas fa-user-circle ml-1 text-indigo-500"></i> {auth.user?.name}
                    </div>
                    {header && (
                        <div className="text-gray-800 font-semibold text-xl">{header}</div>
                    )}
                </div>
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
