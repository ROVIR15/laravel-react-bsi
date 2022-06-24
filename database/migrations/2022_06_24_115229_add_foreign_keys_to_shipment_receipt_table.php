<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToShipmentReceiptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('shipment_receipt', function(Blueprint $table)
		{
			$table->foreign('shipment_item_id', 'fk_shipment_receipt_shipment_item1')->references('id')->on('shipment_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('shipment_receipt', function(Blueprint $table)
		{
			$table->dropForeign('fk_shipment_receipt_shipment_item1');
		});
	}

}
