<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_books', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_names_id');
            $table->foreign('group_names_id')->references('id')->on('group_names');

            $table->unsignedBigInteger('books_id');
            $table->foreign('books_id')->references('id')->on('books');


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
        Schema::dropIfExists('group_books');
    }
}
