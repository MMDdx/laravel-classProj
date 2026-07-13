import { useState, useEffect, useRef } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const photoInputRef = useRef(null);

    const [profile, setProfile] = useState({
        name: user.name || '',
        email: user.email || '',
    });
    const [password, setPassword] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(
        user.profile_photo_path ? `/storage/${user.profile_photo_path}` : null
    );
    const [profileErrors, setProfileErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});
    const [profileProcessing, setProfileProcessing] = useState(false);
    const [passwordProcessing, setPasswordProcessing] = useState(false);

    useEffect(() => {
        setProfile({
            name: user.name || '',
            email: user.email || '',
        });
        setPhotoPreview(
            user.profile_photo_path ? `/storage/${user.profile_photo_path}` : null
        );
    }, [user]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        setProfileProcessing(true);

        const data = new FormData();
        data.append('name', profile.name);
        data.append('email', profile.email);
        if (profilePhoto) {
            data.append('profile_photo', profilePhoto);
        }
        // Add _method as PATCH for Inertia
        data.append('_method', 'PATCH');

        router.post(route('profile.update'), data, {
            preserveScroll: true,
            onSuccess: () => {
                setProfileErrors({});
                setProfilePhoto(null); // Clear selected file after upload
            },
            onError: (err) => setProfileErrors(err),
            onFinish: () => setProfileProcessing(false),
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        setPasswordProcessing(true);
        router.patch(route('password.update'), password, {
            preserveScroll: true,
            onSuccess: () => {
                setPasswordErrors({});
                setPassword({ current_password: '', password: '', password_confirmation: '' });
            },
            onError: (err) => setPasswordErrors(err),
            onFinish: () => setPasswordProcessing(false),
        });
    };

    const getAvatarUrl = () => {
        if (photoPreview) return photoPreview;
        return null;
    };

    const DefaultAvatar = () => (
        <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
    );

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">پروفایل</h2>
                    <p className="text-sm text-gray-500 mt-1">اطلاعات حساب کاربری خود را مدیریت کنید</p>
                </div>
            }
        >
            <Head title="ویرایش پروفایل" />

            <div className="max-w-2xl mx-auto py-8 space-y-6">
                {/* Flash */}
                {status && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-sm text-green-600">{status}</p>
                    </div>
                )}

                {/* Profile Photo */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-gray-800">عکس پروفایل</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200 flex items-center justify-center">
                                    {getAvatarUrl() ? (
                                        <img
                                            src={getAvatarUrl()}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultAvatar />
                                    )}
                                </div>
                            </div>
                            <div className="flex-1">
                                <button
                                    type="button"
                                    onClick={() => photoInputRef.current?.click()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                                >
                                    انتخاب عکس جدید
                                </button>
                                {profilePhoto && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfilePhoto(null);
                                            setPhotoPreview(
                                                user.profile_photo_path
                                                    ? `/storage/${user.profile_photo_path}`
                                                    : null
                                            );
                                            if (photoInputRef.current) photoInputRef.current.value = '';
                                        }}
                                        className="mr-2 text-sm text-red-500 hover:text-red-700 transition"
                                    >
                                        لغو
                                    </button>
                                )}
                                <p className="text-xs text-gray-400 mt-2">فرمت‌های مجاز: JPG, PNG حداکثر ۲ مگابایت</p>
                            </div>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                        {profileErrors.profile_photo && (
                            <p className="mt-2 text-sm text-red-500">{profileErrors.profile_photo}</p>
                        )}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-gray-800">اطلاعات شخصی</h3>
                    </div>
                    <form onSubmit={submitProfile} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                autoComplete="name"
                                required
                            />
                            {profileErrors.name && <p className="mt-1 text-sm text-red-500">{profileErrors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                dir="ltr"
                                autoComplete="email"
                                required
                            />
                            {profileErrors.email && <p className="mt-1 text-sm text-red-500">{profileErrors.email}</p>}
                        </div>

                        {mustVerifyEmail && (
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                    ایمیل شما تأیید نشده است.
                                    <button
                                        type="button"
                                        onClick={() => router.post(route('verification.send'))}
                                        className="mr-1 underline font-medium hover:text-yellow-600"
                                    >
                                        ارسال مجدد ایمیل تأیید
                                    </button>
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={profileProcessing}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition disabled:opacity-50"
                        >
                            {profileProcessing ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-gray-800">تغییر رمز عبور</h3>
                    </div>
                    <form onSubmit={submitPassword} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور فعلی</label>
                            <input
                                type="password"
                                value={password.current_password}
                                onChange={(e) => setPassword({ ...password, current_password: e.target.value })}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                dir="ltr"
                                autoComplete="current-password"
                                required
                            />
                            {passwordErrors.current_password && <p className="mt-1 text-sm text-red-500">{passwordErrors.current_password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور جدید</label>
                            <input
                                type="password"
                                value={password.password}
                                onChange={(e) => setPassword({ ...password, password: e.target.value })}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                dir="ltr"
                                autoComplete="new-password"
                                required
                            />
                            {passwordErrors.password && <p className="mt-1 text-sm text-red-500">{passwordErrors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">تأیید رمز عبور جدید</label>
                            <input
                                type="password"
                                value={password.password_confirmation}
                                onChange={(e) => setPassword({ ...password, password_confirmation: e.target.value })}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                dir="ltr"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={passwordProcessing}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition disabled:opacity-50"
                        >
                            {passwordProcessing ? 'در حال تغییر...' : 'تغییر رمز عبور'}
                        </button>
                    </form>
                </div>

                {/* Delete Account */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-base font-semibold text-red-600 mb-2">حذف حساب کاربری</h3>
                        <p className="text-sm text-gray-500 mb-4">با حذف حساب، تمامی اطلاعات و رزروهای شما برای همیشه حذف خواهد شد.</p>
                        <button
                            onClick={() => {
                                if (confirm('آیا از حذف حساب کاربری خود مطمئن هستید؟ این عمل غیرقابل بازگشت است.')) {
                                    router.delete(route('profile.destroy'));
                                }
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 px-4 rounded-lg border border-red-200 transition"
                        >
                            حذف حساب
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
