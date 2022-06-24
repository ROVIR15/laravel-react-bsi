<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderItemHasProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order_item_has_product', function(Blueprint $table)
		{
			$table->foreign('order_item_id', 'fk_order_item_has_product_feature_order_item1')->references('id')->on('order_item')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('product_feature_id', 'fk_order_item_has_product_feature_product_feature1')->references('id')->on('product_feature')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order_item_has_product', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_item_has_product_feature_order_item1');
			$table->dropForeign('fk_order_item_has_product_feature_product_feature1');
		});
	}

}
