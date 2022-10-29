<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMonitoringBsiSewingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('monitoring_bsi_sewing', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('supermarket_id')->nullable();
			$table->date('date');
			$table->string('po_number', 50)->nullable();
			$table->integer('sales_order_id')->nullable();
			$table->integer('product_feature_id')->nullable();
			$table->integer('order_id')->nullable();
			$table->integer('order_item_id')->nullable();
			$table->integer('line');
			$table->integer('facility_id');
			$table->integer('qty_loading');
			$table->integer('output');
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
		Schema::drop('monitoring_bsi_sewing');
	}

}
