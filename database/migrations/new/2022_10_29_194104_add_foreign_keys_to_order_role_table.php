<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order_role', function(Blueprint $table)
		{
			$table->foreign('order_id', 'fk_order_role_order1')->references('id')->on('order')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order_role', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_role_order1');
		});
	}

}
