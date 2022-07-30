<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToShipmentItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('shipment_item', function(Blueprint $table)
		{
			$table->foreign('order_item_id', 'fk_shipment_item_order_item1')->references('id')->on('order_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('product_feature_id', 'fk_shipment_item_product_feature')->references('id')->on('product_feature')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('shipment_id', 'fk_shipment_item_shipment1')->references('id')->on('shipment')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('shipment_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_shipment_item_order_item1');
			$table->dropForeign('fk_shipment_item_product_feature');
			$table->dropForeign('fk_shipment_item_shipment1');
		});
	}

}
