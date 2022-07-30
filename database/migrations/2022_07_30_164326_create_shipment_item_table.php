<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateShipmentItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shipment_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('shipment_id')->index('fk_shipment_item_order_shipment1_idx');
			$table->integer('order_item_id')->index('fk_shipment_item_order_item1_idx');
			$table->integer('qty_shipped');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shipment_item');
	}

}
