<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGoodsReceiptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('goods_receipt', function(Blueprint $table)
		{
			$table->foreign('facility_id', 'fk_goods_receipt_facility1')->references('id')->on('facility')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('purchase_order_id', 'fk_goods_receipt_purchase_order1')->references('id')->on('purchase_order')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('goods_receipt', function(Blueprint $table)
		{
			$table->dropForeign('fk_goods_receipt_facility1');
			$table->dropForeign('fk_goods_receipt_purchase_order1');
		});
	}

}
