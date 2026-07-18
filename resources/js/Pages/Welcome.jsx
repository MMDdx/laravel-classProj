import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function Welcome({ popularTours }) {
    return (
        <PublicLayout>
            {/* Hero */}
            <section className="hero-gradient text-white py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        سفرهای رویایی با <span className="text-yellow-300">تورلی</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                        بهترین تورهای داخلی و خارجی، قیمت‌های مناسب، پشتیبانی ۲۴ ساعته
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href={route('register')}
                              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-flex items-center justify-center">
                            <i className="fas fa-calendar-alt ml-2"></i> رزرو آنلاین تور
                        </Link>
                        <a href="#tours"
                           className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-indigo-800 transition inline-flex items-center justify-center">
                            <i className="fas fa-chevron-down ml-2"></i> مشاهده تورها
                        </a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">چرا تورلی را انتخاب می‌کنید؟</h2>
                        <p className="text-gray-500 mt-2">تجربه‌ای متفاوت از سفر</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'fa-tag', title: 'بهترین قیمت‌ها', desc: 'تضمین پایین‌ترین قیمت نسبت به بازار' },
                            { icon: 'fa-headset', title: 'پشتیبانی ۲۴ ساعته', desc: 'تیم پشتیبانی همواره همراه شما' },
                            { icon: 'fa-shield-alt', title: 'سفر امن', desc: 'بیمه مسافرتی رایگان به همراه تمام تورها' },
                        ].map((f, i) => (
                            <div key={i} className="text-center p-6 rounded-xl card-hover bg-gray-50">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className={`fas ${f.icon} text-indigo-600 text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
                                <p className="text-gray-500 mt-2">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Tours */}
            <section id="tours" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">تورهای محبوب</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularTours.length > 0 ? popularTours.map(tour => (
                            <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                                <img src={tour.image_url || 'https://images.unsplash.com/photo-1530789253388-582c48173054?w=500&h=300&fit=crop'}
                                     alt={tour.title} className="w-full h-48 object-cover" />
                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
                                        <span className="text-indigo-600 font-bold">{Number(tour.price).toLocaleString()} تومان</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{tour.description}</p>
                                    <Link href={route('tours.show', tour.slug)}
                                          className="mt-4 inline-block w-full text-center bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition">
                                        جزئیات و رزرو
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 col-span-3 text-center">هیچ توری یافت نشد.</p>
                        )}
                    </div>
                    <div className="text-center mt-10">
                        <Link href={route('tours.index')}
                              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow">
                            <i className="fas fa-arrow-left ml-2"></i> مشاهده همه تورها
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
