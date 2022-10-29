<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToShipmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('shipment', function(Blueprint $table)
		{
			$table->foreign('order_id', 'fk_shipment_order1')->references('id')->on('order')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('shipment', function(Blueprint $table)
		{
			$table->dropForeign('fk_shipment_order1');
		});
	}

}
