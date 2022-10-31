<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSalesOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sales_order', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('po_number', 50);
			$table->integer('order_id')->nullable()->index('fk_sales_order_order1_idx');
			$table->integer('sold_to')->nullable()->index('fk_sales_order_buyer1');
			$table->integer('ship_to')->nullable()->index('fk_sales_order_buyer2');
			$table->date('issue_date');
			$table->date('delivery_date');
			$table->date('valid_thru');
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
		Schema::drop('sales_order');
	}

}
