<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOperationResultTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('operation_result', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('party_id')->index('fk_operation_result_party2_idx');
			$table->integer('manufacture_operation_id')->index('fk_operation_result_manufacture_operation2_idx');
			$table->smallInteger('qty_produced')->nullable();
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
		Schema::drop('operation_result');
	}

}
