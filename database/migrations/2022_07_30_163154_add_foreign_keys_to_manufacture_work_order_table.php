<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManufactureWorkOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manufacture_work_order', function(Blueprint $table)
		{
			$table->foreign('work_center_id', 'fk_manufacture_work_order_work_center1')->references('id')->on('work_center')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('manufacture_work_order', function(Blueprint $table)
		{
			$table->dropForeign('fk_manufacture_work_order_work_center1');
		});
	}

}
