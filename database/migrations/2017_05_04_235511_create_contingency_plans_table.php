<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContingencyPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contingency_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->String('name');
            $table->integer('affected_population');
            $table->integer('dead_population');
            $table->integer('building_collapse');
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
        Schema::dropIfExists('contingency_plans');
    }
}
