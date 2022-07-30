<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderAssociationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('order_association', function(Blueprint $table)
		{
			$table->foreign('purchase_order_id', 'fk_order_association_purchase_order1')->references('id')->on('purchase_order')->onUpdate('NO ACTION')->onDelete('CASCADE');
			$table->foreign('sales_order_id', 'fk_order_association_sales_order')->references('id')->on('sales_order')->onUpdate('NO ACTION')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('order_association', function(Blueprint $table)
		{
			$table->dropForeign('fk_order_association_purchase_order1');
			$table->dropForeign('fk_order_association_sales_order');
		});
	}

}
