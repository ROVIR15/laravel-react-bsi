<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRequestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('request', function(Blueprint $table)
		{
			$table->foreign('party_id', 'fk_request_buyer1')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('ship_to', 'fk_request_buyer_shipment1')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('request', function(Blueprint $table)
		{
			$table->dropForeign('fk_request_buyer1');
			$table->dropForeign('fk_request_buyer_shipment1');
		});
	}

}
