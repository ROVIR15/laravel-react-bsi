<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInvoiceReceiptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('invoice_receipt', function(Blueprint $table)
		{
			$table->foreign('purchase_order_id', 'fk_invoice_receipt_purchase_order1')->references('id')->on('purchase_order')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('invoice_receipt', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice_receipt_purchase_order1');
		});
	}

}
