<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (is_file(base_path('libraryiatu.sql'))) {
            $this->call(LibraryImportSeeder::class);

            return;
        }

        $this->call(LibraryDemoSeeder::class);
    }
}
