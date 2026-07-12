import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ProfileEdit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ویرایش پروفایل</h2>}>
            <Head title="پروفایل" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="نام" />
                                    <TextInput id="name" className="mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required autoComplete="name" />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="ایمیل" />
                                    <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} required autoComplete="username" />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                {mustVerifyEmail && user.email_verified_at === null && (
                                    <div>
                                        <p className="text-sm text-gray-800">
                                            ایمیل شما تایید نشده.
                                            <button type="button" className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ms-1" onClick={() => {}}>
                                                ارسال مجدد ایمیل تایید
                                            </button>
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>ذخیره</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
