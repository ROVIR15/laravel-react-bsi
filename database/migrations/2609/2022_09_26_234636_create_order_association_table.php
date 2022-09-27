<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderAssociationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_association', function(Blueprint $table)
		{
			$table->integer('sales_order_id')->index('fk_order_association_sales_order_idx');
			$table->integer('purchase_order_id')->index('fk_order_association_purchase_order1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_association');
	}

}
