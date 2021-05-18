<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('groupname');

            $table->unsignedBigInteger('groupname_id');
            $table->foreign('groupname_id')->references('id')->on('group_names');

            $table->unsignedBigInteger('users_id');
            $table->foreign('users_id')->references('id')->on('users');
            
            $table->unsignedBigInteger('directions_id');
            $table->foreign('directions_id')->references('id')->on('directions');

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
        Schema::dropIfExists('groups');
    }
}
