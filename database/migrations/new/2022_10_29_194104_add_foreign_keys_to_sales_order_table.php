<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSalesOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('sales_order', function(Blueprint $table)
		{
			$table->foreign('sold_to', 'fk_sales_order_buyer1')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('ship_to', 'fk_sales_order_buyer2')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('sales_order', function(Blueprint $table)
		{
			$table->dropForeign('fk_sales_order_buyer1');
			$table->dropForeign('fk_sales_order_buyer2');
		});
	}

}
