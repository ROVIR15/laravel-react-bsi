<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManufactureOperationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manufacture_operation', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('manufacture_id')->index('fk_manufacture_has_operation_manufacture1_idx');
			$table->integer('operation_id')->index('fk_manufacture_has_operation_operation1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('manufacture_operation');
	}

}
