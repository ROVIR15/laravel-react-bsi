<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateShipmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shipment', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('order_id')->index('fk_order_id');
			$table->string('serial_number', 128)->nullable()->default('-');
			$table->date('delivery_date');
			$table->date('est_delivery_date')->nullable();
			$table->integer('shipment_type_id');
			$table->string('comment', 512)->nullable();
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
		Schema::drop('shipment');
	}

}
