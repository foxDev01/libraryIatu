<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('directions', function (Blueprint $table) {
            $table->id();
            $table->string('directionname');
            $table->timestamps();
        });

        Schema::create('group_names', function (Blueprint $table) {
            $table->id();
            $table->string('groupname')->nullable();
            $table->timestamps();
        });

        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('typenames');
            $table->timestamps();
        });

        Schema::create('disciplines', function (Blueprint $table) {
            $table->id();
            $table->string('disciplinename');
            $table->timestamps();
        });

        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('bookname', 500);
            $table->string('link');
            $table->foreignId('type_id')->constrained('types');
            $table->timestamps();
        });

        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('groupname_id')->nullable()->constrained('group_names');
            $table->foreignId('user_id')->nullable()->unique()->constrained('users')->cascadeOnDelete();
            $table->foreignId('direction_id')->nullable()->constrained('directions');
            $table->timestamps();
        });

        Schema::create('group_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('groupname_id')->constrained('group_names');
            $table->foreignId('book_id')->constrained('books');
            $table->timestamps();
            $table->unique(['groupname_id', 'book_id']);
        });

        Schema::create('group_disciplines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->constrained('groups')->cascadeOnDelete();
            $table->foreignId('discipline_id')->constrained('disciplines');
            $table->timestamps();
            $table->unique(['group_id', 'discipline_id']);
        });

        Schema::create('discipline_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discipline_id')->constrained('disciplines');
            $table->foreignId('book_id')->constrained('books');
            $table->timestamps();
            $table->unique(['discipline_id', 'book_id']);
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
        Schema::dropIfExists('discipline_books');
        Schema::dropIfExists('group_disciplines');
        Schema::dropIfExists('group_books');
        Schema::dropIfExists('groups');
        Schema::dropIfExists('books');
        Schema::dropIfExists('disciplines');
        Schema::dropIfExists('types');
        Schema::dropIfExists('group_names');
        Schema::dropIfExists('directions');
    }
};
