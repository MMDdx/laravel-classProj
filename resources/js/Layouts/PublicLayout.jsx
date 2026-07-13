import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

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
                                href={route('login')}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                            >
                                ورود
                            </Link>
                            <Link
                                href={route('register')}
                                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition mr-1"
                            >
                                ثبت‌نام
                            </Link>
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
                            <Link
                                href={route('tours.index')}
                                className="block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                تورها
                            </Link>
                            <Link
                                href={route('login')}
                                className="block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                ورود
                            </Link>
                            <Link
                                href={route('register')}
                                className="block text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                ثبت‌نام
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

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
