<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order', function(Blueprint $table)
		{
			$table->foreign('purchase_order_id', 'fk_order_purchase_order1')->references('id')->on('purchase_order')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('quote_id', 'fk_order_quote1')->references('id')->on('quote')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('sales_order_id', 'fk_order_sales_order1')->references('id')->on('sales_order')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_purchase_order1');
			$table->dropForeign('fk_order_quote1');
			$table->dropForeign('fk_order_sales_order1');
		});
	}

}
