<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGoodsReceiptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('goods_receipt', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('purchase_order_id')->index('fk_goods_receipt_purchase_order1_idx');
			$table->integer('facility_id')->nullable()->index('fk_goods_receipt_facility1_idx');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('goods_receipt');
	}

}
