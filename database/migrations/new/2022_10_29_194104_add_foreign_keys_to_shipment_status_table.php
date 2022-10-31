<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToShipmentStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('shipment_status', function(Blueprint $table)
		{
			$table->foreign('shipment_id', 'fk_shipment_type_status_has_shipment_shipment1')->references('id')->on('shipment')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('shipment_type_status_id', 'fk_shipment_type_status_has_shipment_shipment_type_status1')->references('id')->on('shipment_type_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('shipment_status', function(Blueprint $table)
		{
			$table->dropForeign('fk_shipment_type_status_has_shipment_shipment1');
			$table->dropForeign('fk_shipment_type_status_has_shipment_shipment_type_status1');
		});
	}

}
