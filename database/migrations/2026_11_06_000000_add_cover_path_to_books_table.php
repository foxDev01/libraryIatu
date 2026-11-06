<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // Обложка хранится на том же приватном диске, что и файл книги,
            // и отдаётся через BookController::cover(). Необязательна: карточка
            // рисует заглушку, если обложки нет.
            $table->string('cover_path')->nullable()->after('file_path');
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn('cover_path');
        });
    }
};
