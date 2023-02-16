<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemHasProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_item_has_product', function(Blueprint $table)
		{
			$table->integer('order_item_id')->index('fk_order_item_has_product_feature_order_item1_idx');
			$table->integer('product_feature_id')->index('fk_order_item_has_product_feature_product_feature1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_item_has_product');
	}

}
