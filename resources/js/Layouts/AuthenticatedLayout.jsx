import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head>
                <link rel="icon" type="image/png" href="/logo.png" />
            </Head>

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo + Brand */}
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/logo.png" alt="تورلی" className="h-11 w-11 object-contain" onerror={(e) => { e.target.style.display = 'none' }} />
                            <div className="flex flex-col leading-tight">
                                <span className="text-2xl font-extrabold text-blue-600 tracking-tight">تورلی</span>
                                <span className="text-[11px] font-semibold text-gray-400 tracking-[0.2em] uppercase -mt-0.5">Tourly</span>
                            </div>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href={route('tours.index')}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                            >
                                تورها
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                            >
                                داشبورد
                            </Link>
                            <Link
                                href={route('bookings.index')}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                            >
                                رزروهای من
                            </Link>

                            {user?.is_admin && (
                                <Link
                                    href={route('admin.users.index')}
                                    className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-2 rounded-lg transition"
                                >
                                    پنل مدیریت
                                </Link>
                            )}

                            <div className="w-px h-6 bg-gray-200 mx-1"></div>

                            <span className="text-sm text-gray-500">{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                            >
                                خروج
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            <p className="text-sm text-gray-400 px-3 py-1 border-b border-gray-100 mb-2">{user.name}</p>
                            <Link
                                href={route('tours.index')}
                                className="block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                تورها
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className="block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                داشبورد
                            </Link>
                            <Link
                                href={route('bookings.index')}
                                className="block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                رزروهای من
                            </Link>
                            {user?.is_admin && (
                                <Link
                                    href={route('admin.users.index')}
                                    className="block text-sm font-medium text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    پنل مدیریت
                                </Link>
                            )}
                            <Link
                                href={route('profile.edit')}
                                className="block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                ویرایش پروفایل
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-right text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                            >
                                خروج
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {header}
                    </div>
                </header>
            )}

            {/* Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    تمامی حقوق محفوظ است.
                </div>
            </footer>
        </div>
    );
}
