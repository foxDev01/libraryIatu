<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDisciplineBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discipline_books', function (Blueprint $table) {
            $table->id();
            // $table->string('disciplinename');

            $table->unsignedBigInteger('book_id');
            $table->foreign('book_id')->references('id')->on('books');

            $table->unsignedBigInteger('discipline_id');
            $table->foreign('disciplines_id')->references('id')->on('disciplines');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discipline_books');
    }
}
