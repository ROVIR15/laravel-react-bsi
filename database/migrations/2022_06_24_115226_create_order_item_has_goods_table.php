<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemHasGoodsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_item_has_goods', function(Blueprint $table)
		{
			$table->integer('order_item_id');
			$table->integer('order_item_order_id');
			$table->integer('goods_id')->index('fk_order_item_has_goods_goods1_idx');
			$table->index(['order_item_id','order_item_order_id'], 'fk_order_item_has_goods_order_item1_idx');
			$table->primary(['order_item_id','order_item_order_id','goods_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_item_has_goods');
	}

}
