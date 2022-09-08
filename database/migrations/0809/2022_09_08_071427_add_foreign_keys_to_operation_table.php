<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOperationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('operation', function(Blueprint $table)
		{
			$table->foreign('bom_id', 'fk_operation_bom1')->references('id')->on('bom')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('work_center_id', 'fk_operation_work_center1')->references('id')->on('work_center')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('operation', function(Blueprint $table)
		{
			$table->dropForeign('fk_operation_bom1');
			$table->dropForeign('fk_operation_work_center1');
		});
	}

}
