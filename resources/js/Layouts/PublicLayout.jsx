import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Head } from '@inertiajs/react';

function UserAvatar({ user, size = 'w-8 h-8', textSize = 'text-xs' }) {
    const avatarUrl = user?.profile_photo_path
        ? `/storage/${user.profile_photo_path}`
        : null;

    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt={user.name}
                className={`${size} rounded-full object-cover border-2 border-blue-400`}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
        );
    }

    return (
        <div className={`${size} rounded-full bg-blue-800 flex items-center justify-center border-2 border-blue-400`}>
            <span className={`${textSize} font-bold text-white`}>
                {user?.name?.charAt(0) || '?'}
            </span>
        </div>
    );
}

export default function PublicLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

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
            <nav className="bg-blue-950 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo + Brand */}
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/logo.png" alt="تورلی" className="h-11 w-11 object-contain" onerror={(e) => { e.target.style.display = 'none' }} />
                            <div className="flex flex-col leading-tight">
                                <span className="text-2xl font-extrabold text-white tracking-tight">تورلی</span>
                                <span className="text-[11px] font-semibold text-blue-300 tracking-[0.2em] uppercase -mt-0.5">Tourly</span>
                            </div>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href={route('tours.index')}
                                className="text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                            >
                                تورها
                            </Link>

                            {!user ? (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                    >
                                        ورود
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition mr-1"
                                    >
                                        ثبت‌نام
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                    >
                                        داشبورد
                                    </Link>
                                    <Link
                                        href={route('bookings.index')}
                                        className="text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                    >
                                        رزروهای من
                                    </Link>

                                    {user?.is_admin && (
                                        <Link
                                            href={route('admin.users.index')}
                                            className="text-sm font-medium text-amber-300 hover:text-amber-200 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                        >
                                            پنل مدیریت
                                        </Link>
                                    )}

                                    <div className="w-px h-6 bg-blue-700 mx-1"></div>

                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-blue-800 transition"
                                    >
                                        <UserAvatar user={user} />
                                        <span className="text-sm text-blue-100 font-medium">{user.name}</span>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-red-300 hover:text-red-200 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                    >
                                        خروج
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-blue-200 hover:bg-blue-800 transition"
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
                    <div className="md:hidden border-t border-blue-800 bg-blue-950">
                        <div className="px-4 py-3 space-y-1">
                            <Link
                                href={route('tours.index')}
                                className="block text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                تورها
                            </Link>

                            {!user ? (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="block text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        ورود
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="block text-sm font-medium text-blue-200 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        ثبت‌نام
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 px-3 py-2 border-b border-blue-800 mb-2">
                                        <UserAvatar user={user} size="w-10 h-10" textSize="text-sm" />
                                        <span className="text-sm text-blue-100 font-medium">{user.name}</span>
                                    </div>
                                    <Link
                                        href={route('dashboard')}
                                        className="block text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        داشبورد
                                    </Link>
                                    <Link
                                        href={route('bookings.index')}
                                        className="block text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        رزروهای من
                                    </Link>
                                    {user?.is_admin && (
                                        <Link
                                            href={route('admin.users.index')}
                                            className="block text-sm font-medium text-amber-300 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            پنل مدیریت
                                        </Link>
                                    )}
                                    <Link
                                        href={route('profile.edit')}
                                        className="block text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        ویرایش پروفایل
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-right text-sm font-medium text-red-300 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                                    >
                                        خروج
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-blue-950 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-blue-300">
                    تمامی حقوق محفوظ است.
                </div>
            </footer>
        </div>
    );
}
