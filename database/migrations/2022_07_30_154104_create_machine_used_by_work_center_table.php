<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMachineUsedByWorkCenterTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('machine_used_by_work_center', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('work_center_id')->index('fk_machine_used_by_work_center_work_center1_idx');
			$table->integer('product_id')->index('fk_machine_used_by_work_center_product1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('machine_used_by_work_center');
	}

}
