<?php

namespace Database\Seeders;

use App\Models\Tour;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TourSeeder extends Seeder
{
    public function run(): void
    {
        $tours = [
            [
                'title' => 'تور شکوه‌های ایران (اصفهان - شیراز - یزد)',
                'description' => 'سفر ۷ روزه به سه شهر تاریخی ایران. بازدید از میدان نقش جهان، تخت جمشید، باغ ارم، بافت تاریخی یزد و ... همراه با راهنمای مجرب و اقامت در هتل‌های سنتی و مدرن.',
                'price' => 12500000,
                'start_date' => '2025-07-15',
                'end_date' => '2025-07-22',
                'max_capacity' => 25,
                'location' => 'اصفهان، شیراز، یزد',
                'image_url' => 'https://images.unsplash.com/photo-1548013146-72479768bada',
                'is_active' => true,
            ],
            [
                'title' => 'تور استانبول و کاپادوکیا',
                'description' => 'تور ۸ روزه ترکیه شامل استانبول و کاپادوکیا. بازدید از ایا صوفیه، مسجد آبی، کاخ توپکاپی، بالون سواری در کاپادوکیا و اقامت در هتل‌های ۴ ستاره.',
                'price' => 18900000,
                'start_date' => '2025-08-05',
                'end_date' => '2025-08-13',
                'max_capacity' => 30,
                'location' => 'استانبول، کاپادوکیا',
                'image_url' => 'https://images.unsplash.com/photo-1527838832700-5054e4898686',
                'is_active' => true,
            ],
            [
                'title' => 'تور کیش (تفریحات آبی و آرامش)',
                'description' => 'تور ۴ روزه به جزیره کیش با تفریحات آبی، غواصی، کشتی تفریحی، و بازدید از مرجان‌ها. اقامت در هتل‌های لوکس ساحلی.',
                'price' => 5800000,
                'start_date' => '2025-07-25',
                'end_date' => '2025-07-29',
                'max_capacity' => 40,
                'location' => 'جزیره کیش',
                'image_url' => 'https://images.unsplash.com/photo-1586500036702-6bcac6b3bdd1',
                'is_active' => true,
            ],
            [
                'title' => 'تور دبی لاکچری',
                'description' => 'تور ۵ روزه دبی شامل اقامت در هتل ۵ ستاره، بازدید از برج خلیفه، دبی مال، فواره‌های دبی، سافاری در بیابان و شام شناور.',
                'price' => 24500000,
                'start_date' => '2025-09-10',
                'end_date' => '2025-09-15',
                'max_capacity' => 20,
                'location' => 'دبی، امارات',
                'image_url' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
                'is_active' => true,
            ],
            [
                'title' => 'تور شمال ایران (گرگان تا رامسر)',
                'description' => 'تور ۶ روزه طبیعت گردی در استان‌های گلستان، مازندران و گیلان. بازدید از جنگل ابر، دریاچه ولشت، قلعه رودخان، تله کابین نمک آبرود و بازار سنتی رامسر.',
                'price' => 7200000,
                'start_date' => '2025-08-20',
                'end_date' => '2025-08-26',
                'max_capacity' => 35,
                'location' => 'گرگان، ساری، رامسر',
                'image_url' => 'https://images.unsplash.com/photo-1584128071033-c571ec12614c',
                'is_active' => true,
            ],
            [
                'title' => 'تور آنتالیا (بهشت ترکیه)',
                'description' => 'تور ۷ روزه آنتالیا با پرواز مستقیم، اقامت در هتل ۵ ستاره اولوسان، سفر به اولودنیز، آبشار دودن، و کشتی تفریحی.',
                'price' => 15800000,
                'start_date' => '2025-09-05',
                'end_date' => '2025-09-12',
                'max_capacity' => 25,
                'location' => 'آنتالیا، ترکیه',
                'image_url' => 'https://images.unsplash.com/photo-1582472164424-73b2ff0e8000',
                'is_active' => true,
            ],
            [
                'title' => 'تور مشهد (زیارتی - تفریحی)',
                'description' => 'تور ۴ روزه مشهد شامل اقامت در هتل نزدیک حرم، ترانسفر فرودگاهی، وعده‌های غذایی، و بازدید از طرقبه و شاندیز.',
                'price' => 4800000,
                'start_date' => '2025-07-10',
                'end_date' => '2025-07-14',
                'max_capacity' => 45,
                'location' => 'مشهد',
                'image_url' => 'https://images.unsplash.com/photo-1621944190310-e3cca1564fd6',
                'is_active' => true,
            ],
            [
                'title' => 'تور تایلند (بانکوک - پوکت)',
                'description' => 'تور ۱۰ روزه تایلند با بازدید از معابد بانکوک، بازار شناور، جزیره پوکت، شنا با فیل‌ها و ماساژ سنتی تایلندی.',
                'price' => 32500000,
                'start_date' => '2025-11-01',
                'end_date' => '2025-11-11',
                'max_capacity' => 18,
                'location' => 'بانکوک، پوکت، تایلند',
                'image_url' => 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
                'is_active' => false, // مثال: غیرفعال
            ],
        ];

        foreach ($tours as $tour) {
            Tour::create([
                'title' => $tour['title'],
                'slug' => Str::slug($tour['title']),
                'description' => $tour['description'],
                'price' => $tour['price'],
                'start_date' => $tour['start_date'],
                'end_date' => $tour['end_date'],
                'max_capacity' => $tour['max_capacity'],
                'location' => $tour['location'],
                'image_url' => $tour['image_url'],
                'is_active' => $tour['is_active'],
            ]);
        }
    }
}
