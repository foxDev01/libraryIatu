<?php

use Database\Seeders\BookSeeder;
use Database\Seeders\GroupBookSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this-> call ([
            UserSeeder :: class,
            BookSeeder ::class,
            GroupBookSeeder ::class
        ]);
    }
}
