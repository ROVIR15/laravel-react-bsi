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
			$table->integer('supermarket_id');
			$table->date('date');
			$table->string('po_number', 50);
			$table->integer('sales_order_id');
			$table->integer('product_feature_id');
			$table->integer('order_id');
			$table->integer('order_item_id');
			$table->integer('line');
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
