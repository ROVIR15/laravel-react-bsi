<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGoodsReceiptItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('goods_receipt_items', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('goods_receipt_id')->nullable()->index('fk_goods_receipt_items_goods_receipt1_idx');
			$table->integer('product_feature_id')->nullable();
			$table->integer('order_item_id')->nullable();
			$table->integer('order_item_order_id')->nullable();
			$table->integer('qty_received')->nullable();
			$table->integer('qty_on_receipt')->nullable();
			$table->timestamps();
			$table->index(['order_item_id','order_item_order_id'], 'fk_goods_receipt_items_order_item1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('goods_receipt_items');
	}

}
