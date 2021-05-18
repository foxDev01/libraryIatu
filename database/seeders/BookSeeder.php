<?php

namespace Database\Seeders;

use Faker\Provider\ar_JO\Internet;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Ramsey\Uuid\Type\Integer;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('books')->insert([
            'bookname' => Str::random(10),
            'link' => Str::random(10).'@gmail.com',
            'type_id' => 5
        ]);
    }
}
