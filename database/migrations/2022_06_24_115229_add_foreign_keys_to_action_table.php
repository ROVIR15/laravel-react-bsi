<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToActionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('action', function(Blueprint $table)
		{
			$table->foreign('action_type_id', 'fk_action_action_type_id1')->references('id')->on('action_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('manufacture_operation_id', 'fk_action_manufacture_operation_idx')->references('id')->on('manufacture_operation')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('action', function(Blueprint $table)
		{
			$table->dropForeign('fk_action_action_type_id1');
			$table->dropForeign('fk_action_manufacture_operation_idx');
		});
	}

}
