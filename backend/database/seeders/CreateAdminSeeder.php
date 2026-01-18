<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CreateAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Thanh Bình IT',
            'email' => 'thanhbinhit@gmail.com',
            'password' => Hash::make('taolaconma'),
            'role' => 'admin',
            'phone' => null,
            'student_code' => 'thanhbinhit',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
