<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateShipmentReceiptViewTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shipment_receipt_view', function(Blueprint $table)
		{
			$table->integer('shipment_id')->nullable();
			$table->integer('shipment_item_id')->nullable();
			$table->integer('product_feature_id')->nullable();
			$table->integer('qty_shipped')->nullable();
			$table->integer('qty_accepted')->nullable();
			$table->integer('created_at')->nullable();
			$table->integer('updated_at')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shipment_receipt_view');
	}

}
