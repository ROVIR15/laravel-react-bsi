<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemShipmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_item_shipment', function(Blueprint $table)
		{
			$table->integer('order_item_id');
			$table->integer('order_item_order_id');
			$table->integer('shipment_item_id')->index('fk_order_item_has_shipment_item_shipment_item1_idx');
			$table->integer('inventory_type_id')->index('fk_order_item_has_shipment_item_inventory_type1_idx');
			$table->index(['order_item_id','order_item_order_id'], 'fk_order_item_has_shipment_item_order_item1_idx');
			$table->primary(['order_item_id','order_item_order_id','shipment_item_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_item_shipment');
	}

}
