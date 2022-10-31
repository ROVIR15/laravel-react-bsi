<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('order_id')->index('order_id');
			$table->integer('qty')->nullable();
			$table->integer('unit_price')->nullable();
			$table->date('shipment_estimated')->nullable();
			$table->integer('product_feature_id')->nullable()->index('fk_order_item_product_id1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_item');
	}

}
