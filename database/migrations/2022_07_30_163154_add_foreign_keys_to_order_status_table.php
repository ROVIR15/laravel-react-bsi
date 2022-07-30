<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order_status', function(Blueprint $table)
		{
			$table->foreign('order_id', 'fk_order_status_order1')->references('id')->on('order')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order_status', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_status_order1');
		});
	}

}
