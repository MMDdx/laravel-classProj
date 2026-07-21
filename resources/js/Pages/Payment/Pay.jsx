import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function PaymentPay({ tour, number_of_people, errors }) {
    const totalPrice = tour.price * number_of_people;
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv2, setCvv2] = useState('');

    const formatCardNumber = (val) => {
        const clean = val.replace(/\D/g, '').slice(0, 16);
        return clean.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (val) => {
        const clean = val.replace(/\D/g, '').slice(0, 4);
        if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
        return clean;
    };

    const handlePay = (e) => {
        e.preventDefault();
        setProcessing(true);
        router.post(route('payment.pay', tour.slug), {
            number_of_people: number_of_people,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <DashboardLayout header="پرداخت">
            <Head title="پرداخت" />

            <div className="max-w-2xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>1</div>
                        <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>اطلاعات رزرو</span>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>2</div>
                        <span className={`text-sm font-medium ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>پرداخت</span>
                    </div>
                </div>

                {/* Tour Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                    {tour.image_url && (
                        <img src={'/' + tour.image_url} alt={tour.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-5">
                        <h2 className="text-xl font-bold text-gray-800">{tour.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                            <span>📍 {tour.location}</span>
                            <span>📅 {tour.start_date_jalali}</span>
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between items-center">
                            <span className="text-gray-600">تعداد نفرات: <b>{number_of_people} نفر</b></span>
                            <span className="text-xl font-bold text-blue-600">{totalPrice.toLocaleString()} تومان</span>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    {step === 1 ? (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">اطلاعات پرداخت</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">شماره کارت</label>
                                    <input type="text"
                                           value={cardNumber}
                                           onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                           placeholder="xxxx xxxx xxxx xxxx"
                                           dir="ltr"
                                           className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 font-mono tracking-wider text-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ انقضا</label>
                                        <input type="text"
                                               value={expiryDate}
                                               onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                                               placeholder="YY/MM"
                                               dir="ltr"
                                               className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 font-mono text-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV2</label>
                                        <input type="password"
                                               value={cvv2}
                                               onChange={(e) => setCvv2(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                               placeholder="****"
                                               dir="ltr"
                                               className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 font-mono text-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                                {errors?.general && (
                                    <p className="text-sm text-red-500">{errors.general}</p>
                                )}
                                <button onClick={() => setStep(2)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition">
                                    ادامه به تأیید نهایی
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">تأیید پرداخت</h3>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-center">
                                <p className="text-green-700 font-bold text-lg">{totalPrice.toLocaleString()} تومان</p>
                                <p className="text-green-600 text-sm mt-1 font-mono tracking-wider">
                                    به شماره کارت: {cardNumber || '----'}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition">
                                    بازگشت
                                </button>
                                <button onClick={handlePay} disabled={processing}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-50">
                                    {processing ? 'در حال پرداخت...' : 'پرداخت و تأیید رزرو'}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-4 text-center">
                    <a href="javascript:history.back()" className="text-sm text-gray-500 hover:text-gray-700">
                        لغو و بازگشت
                    </a>
                </div>
            </div>
        </DashboardLayout>
    );
}
