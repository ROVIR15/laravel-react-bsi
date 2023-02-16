<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMonitoringBsiNumberingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('monitoring_bsi_numbering', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('cutting_id');
			$table->date('date');
			$table->string('po_number', 50);
			$table->integer('sales_order_id');
			$table->integer('order_id');
			$table->integer('order_item_id');
			$table->integer('product_feature_id');
			$table->integer('qty');
			$table->string('numbering', 20);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('monitoring_bsi_numbering');
	}

}
