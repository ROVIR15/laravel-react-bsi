<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemShipment1Table extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_item_shipment_1', function(Blueprint $table)
		{
			$table->integer('shipment_id')->nullable();
			$table->integer('shipment_item_id')->nullable();
			$table->integer('order_id')->nullable();
			$table->integer('product_feature_id')->nullable();
			$table->integer('qty_ordered')->nullable();
			$table->integer('qty_shipped')->nullable();
			$table->integer('lefted')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_item_shipment_1');
	}

}
