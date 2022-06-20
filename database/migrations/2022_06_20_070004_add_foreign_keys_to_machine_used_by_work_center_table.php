<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMachineUsedByWorkCenterTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('machine_used_by_work_center', function(Blueprint $table)
		{
			$table->foreign('product_id', 'fk_machine_used_by_work_center_product1')->references('id')->on('product')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('work_center_id', 'fk_machine_used_by_work_center_work_center1')->references('id')->on('work_center')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('machine_used_by_work_center', function(Blueprint $table)
		{
			$table->dropForeign('fk_machine_used_by_work_center_product1');
			$table->dropForeign('fk_machine_used_by_work_center_work_center1');
		});
	}

}
