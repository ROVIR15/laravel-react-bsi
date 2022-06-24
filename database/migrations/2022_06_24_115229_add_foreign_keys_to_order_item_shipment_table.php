<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderItemShipmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order_item_shipment', function(Blueprint $table)
		{
			$table->foreign('inventory_type_id', 'fk_order_item_has_shipment_item_inventory_type1')->references('id')->on('inventory_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('order_item_id', 'fk_order_item_has_shipment_item_order_item1')->references('id')->on('order_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('shipment_item_id', 'fk_order_item_has_shipment_item_shipment_item1')->references('id')->on('shipment_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order_item_shipment', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_item_has_shipment_item_inventory_type1');
			$table->dropForeign('fk_order_item_has_shipment_item_order_item1');
			$table->dropForeign('fk_order_item_has_shipment_item_shipment_item1');
		});
	}

}
