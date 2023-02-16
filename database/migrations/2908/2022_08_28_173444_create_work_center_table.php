<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkCenterTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('work_center', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('name', 45)->nullable();
			$table->string('company_name', 45)->nullable();
			$table->integer('oee_target')->nullable();
			$table->integer('prod_capacity')->nullable();
			$table->integer('work_hours')->nullable();
			$table->integer('layout_produksi')->nullable();
			$table->integer('cost_per_hour')->nullable();
			$table->integer('labor_alloc');
			$table->string('description', 45)->nullable();
			$table->integer('overhead_cost')->comment('this variable which occurs cost to run a work center');
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
		Schema::drop('work_center');
	}

}
