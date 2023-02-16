<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToItemIssuanceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('item_issuance', function(Blueprint $table)
		{
			$table->foreign('shipment_id', 'fk_item_issuance_shipment1')->references('id')->on('shipment')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('shipment_item_id', 'fk_item_issuance_shipment_item1')->references('id')->on('shipment_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('item_issuance', function(Blueprint $table)
		{
			$table->dropForeign('fk_item_issuance_shipment1');
			$table->dropForeign('fk_item_issuance_shipment_item1');
		});
	}

}
