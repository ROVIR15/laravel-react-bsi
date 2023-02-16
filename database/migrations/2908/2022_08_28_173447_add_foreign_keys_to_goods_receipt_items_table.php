<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGoodsReceiptItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('goods_receipt_items', function(Blueprint $table)
		{
			$table->foreign('goods_receipt_id', 'fk_goods_receipt_items_goods_receipt1')->references('id')->on('goods_receipt')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('order_item_id', 'fk_goods_receipt_items_order_item1')->references('id')->on('order_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('goods_receipt_items', function(Blueprint $table)
		{
			$table->dropForeign('fk_goods_receipt_items_goods_receipt1');
			$table->dropForeign('fk_goods_receipt_items_order_item1');
		});
	}

}
