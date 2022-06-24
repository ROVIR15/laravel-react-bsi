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
			$table->foreign('shipment_id', 'shipment_fk')->references('id')->on('shipment')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('shipment_item_id', 'shipment_item_fk')->references('id')->on('shipment_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
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
			$table->dropForeign('shipment_fk');
			$table->dropForeign('shipment_item_fk');
		});
	}

}
