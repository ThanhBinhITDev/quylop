<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Lớp Trưởng',
            'email' => 'admin@gmail.com',
            'student_code' => 'admin', // Dang nhap bang ma nay
            'password' => Hash::make('123456'),
            'role' => 'admin',
            'phone' => '0999999999',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Them mot vai sinh vien mau
        DB::table('users')->insert([
            'name' => 'Nguyễn Văn A',
            'email' => 'student@gmail.com',
            'student_code' => 'SV001',
            'password' => Hash::make('123456'),
            'role' => 'student',
            'phone' => '0988888888',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
