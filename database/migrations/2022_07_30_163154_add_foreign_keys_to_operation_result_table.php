<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOperationResultTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('operation_result', function(Blueprint $table)
		{
			$table->foreign('manufacture_operation_id', 'fk_operation_result_manufacture_operation2')->references('id')->on('manufacture_operation')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('party_id', 'fk_operation_result_party2')->references('id')->on('party')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('operation_result', function(Blueprint $table)
		{
			$table->dropForeign('fk_operation_result_manufacture_operation2');
			$table->dropForeign('fk_operation_result_party2');
		});
	}

}
