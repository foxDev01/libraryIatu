<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // Книга может быть файлом в диске или ссылкой на внешний ресурс.
            $table->string('file_path')->nullable()->after('link');
            $table->string('link')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn('file_path');
            $table->string('link')->nullable(false)->change();
        });
    }
};
