<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManufactureOperationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manufacture_operation', function(Blueprint $table)
		{
			$table->foreign('manufacture_id', 'fk_manufacture_has_operation_manufacture1')->references('id')->on('manufacture')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('operation_id', 'fk_manufacture_has_operation_operation1')->references('id')->on('operation')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('manufacture_operation', function(Blueprint $table)
		{
			$table->dropForeign('fk_manufacture_has_operation_manufacture1');
			$table->dropForeign('fk_manufacture_has_operation_operation1');
		});
	}

}
