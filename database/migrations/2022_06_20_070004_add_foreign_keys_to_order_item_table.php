<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order_item', function(Blueprint $table)
		{
			$table->foreign('order_id', 'fk_order_item_order_id1')->references('id')->on('order')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('product_feature_id', 'fk_order_item_product_id1')->references('id')->on('product_feature')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_item_order_id1');
			$table->dropForeign('fk_order_item_product_id1');
		});
	}

}
