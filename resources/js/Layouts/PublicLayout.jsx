import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="bg-gray-50 antialiased min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-indigo-600">تورلی</Link>
                            <span className="text-xs text-gray-400 mr-2 hidden sm:inline">Tourly</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <>
                                    <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                                        <i className="fas fa-tachometer-alt ml-1"></i> داشبورد
                                    </Link>
                                    <Link href={route('logout')} method="post" as="button"
                                          className="text-gray-700 hover:text-red-600 transition font-medium">
                                        <i className="fas fa-sign-out-alt ml-1"></i> خروج
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-700 hover:text-indigo-600 transition font-medium">
                                        <i className="fas fa-sign-in-alt ml-1"></i> ورود
                                    </Link>
                                    <Link href={route('register')}
                                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                                        <i className="fas fa-user-plus ml-1"></i> ثبت‌نام
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>© ۱۴۰۴ – تمامی حقوق متعلق به <span className="text-indigo-400">تورلی</span> است.</p>
                </div>
            </footer>
        </div>
    );
}
