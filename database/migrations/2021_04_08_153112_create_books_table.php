<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('bookname');
            $table->string('link');
            $table->unsignedBigInteger('types_id');
            $table->foreign('types_id')->references('id')->on('types');
            // $table->unsignedBigInteger('group_names_id');
            // $table->foreign('group_names_id')->references('id')->on('group_names');
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
        Schema::dropIfExists('books');
    }
}
