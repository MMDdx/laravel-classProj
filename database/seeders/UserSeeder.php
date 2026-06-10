<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'مدیر سیستم',
            'email' => 'admin@tourly.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Create 5 regular users with Persian names
        $users = [
            ['name' => 'احمد رضایی', 'email' => 'ahmad@example.com'],
            ['name' => 'سارا محمدی', 'email' => 'sara@example.com'],
            ['name' => 'رضا کریمی', 'email' => 'reza@example.com'],
            ['name' => 'نرگس احمدی', 'email' => 'narges@example.com'],
            ['name' => 'علی نوری', 'email' => 'ali@example.com'],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'is_admin' => false,
            ]);
        }
    }
}
