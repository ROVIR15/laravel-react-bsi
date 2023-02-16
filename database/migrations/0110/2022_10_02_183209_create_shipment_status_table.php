<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateShipmentStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shipment_status', function(Blueprint $table)
		{
			$table->integer('shipment_type_status_id')->index('fk_shipment_type_status_has_shipment_shipment_type_status1_idx');
			$table->integer('shipment_id')->index('fk_shipment_type_status_has_shipment_shipment1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shipment_status');
	}

}
