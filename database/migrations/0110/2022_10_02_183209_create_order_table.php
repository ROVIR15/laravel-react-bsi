<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('sales_order_id')->nullable()->index('fk_order_sales_order1_idx');
			$table->integer('purchase_order_id')->nullable()->index('fk_order_purchase_order1_idx');
			$table->integer('quote_id')->nullable()->index('fk_order_quote1_idx');
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
		Schema::drop('order');
	}

}
