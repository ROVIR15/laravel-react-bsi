<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePurchaseOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('purchase_order', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('order_id')->nullable()->index('fk_purchase_order_order1_idx');
			$table->string('po_number', 45);
			$table->integer('bought_from')->nullable()->index('fk_bought_from');
			$table->integer('ship_to')->nullable()->index('fk_ship_to1');
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
		Schema::drop('purchase_order');
	}

}
