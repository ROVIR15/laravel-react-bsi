<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRequestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('request', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('req_type', 15)->nullable();
			$table->integer('party_id')->nullable()->index('fk_request_buyer1_idx');
			$table->integer('ship_to')->nullable()->index('fk_request_buyer_shipment1');
			$table->string('po_number', 150)->nullable();
			$table->date('po_date')->nullable();
			$table->date('delivery_date');
			$table->date('valid_to');
			$table->timestamps();
			$table->index(['party_id','ship_to'], 'fk_request_buyer_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('request');
	}

}
