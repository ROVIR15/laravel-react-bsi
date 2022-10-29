<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInvoiceItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('invoice_id')->index('fk_invoice_item_invoice1_idx1');
			$table->integer('invoice_item_type_id')->nullable()->index('fk_invoice_item_invoice_item_type1_idx');
			$table->integer('order_item_id');
			$table->integer('order_item_order_id')->nullable();
			$table->integer('qty');
			$table->integer('amount');
			$table->timestamps();
			$table->index(['order_item_id','order_item_order_id'], 'fk_invoice_item_order_item1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('invoice_item');
	}

}
