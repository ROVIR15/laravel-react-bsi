<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateActionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('action', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('manufacture_operation_id')->index('fk_action_manufacture_operation_idx');
			$table->integer('action_type_id')->index('fk_action_action_type_id1');
			$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('action');
	}

}
