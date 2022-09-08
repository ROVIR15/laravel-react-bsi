<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateItemIssuanceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('item_issuance', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('shipment_id')->index('fk_item_issuance_shipment1_idx');
			$table->integer('shipment_item_id')->index('fk_item_issuance_shipment_item1_idx');
			$table->integer('item_issued');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('item_issuance');
	}

}
