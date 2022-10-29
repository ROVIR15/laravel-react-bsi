<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMonitoringBsiSpreadingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('monitoring_bsi_spreading', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->date('date');
			$table->integer('sales_order_id');
			$table->string('po_number', 50);
			$table->integer('order_id');
			$table->integer('product_feature_id');
			$table->string('ratio', 150);
			$table->float('marker_length', 10, 0);
			$table->float('fabric_length', 10, 0);
			$table->float('fabric_width', 10, 0);
			$table->float('actual_spread_length', 10, 0);
			$table->integer('lot');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('monitoring_bsi_spreading');
	}

}
