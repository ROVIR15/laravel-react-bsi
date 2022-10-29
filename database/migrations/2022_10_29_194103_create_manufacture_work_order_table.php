<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManufactureWorkOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manufacture_work_order', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('manufacture_id')->index('fk_manufacture_work_order_manufacture1_idx');
			$table->integer('work_center_id')->index('fk_manufacture_work_order_work_center1_idx');
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
		Schema::drop('manufacture_work_order');
	}

}
