<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateShipmentReceiptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shipment_receipt', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('qty_accepted');
			$table->timestamps();
			$table->integer('shipment_item_id')->index('fk_shipment_receipt_shipment_item1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shipment_receipt');
	}

}
