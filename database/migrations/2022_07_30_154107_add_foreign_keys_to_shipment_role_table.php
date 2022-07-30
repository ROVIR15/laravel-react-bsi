<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToShipmentRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('shipment_role', function(Blueprint $table)
		{
			$table->foreign('shipment_receipt_id', 'fk_shipment_role_shipment_receipt1')->references('id')->on('shipment_receipt')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('shipment_role', function(Blueprint $table)
		{
			$table->dropForeign('fk_shipment_role_shipment_receipt1');
		});
	}

}
