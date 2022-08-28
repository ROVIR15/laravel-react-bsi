<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPurchaseOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('purchase_order', function(Blueprint $table)
		{
			$table->foreign('bought_from', 'fk_po_bought_from1')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('order_id', 'fk_purchase_order_order1')->references('id')->on('order')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('ship_to', 'fk_ship_to1')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('purchase_order', function(Blueprint $table)
		{
			$table->dropForeign('fk_po_bought_from1');
			$table->dropForeign('fk_purchase_order_order1');
			$table->dropForeign('fk_ship_to1');
		});
	}

}
