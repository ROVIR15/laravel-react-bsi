<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPaymentApplicationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('payment_application', function(Blueprint $table)
		{
			$table->foreign('billing_account_id', 'fk_payment_application_billing_account1')->references('id')->on('billing_account')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('invoice_item_id', 'fk_payment_application_invoice_item1')->references('id')->on('invoice_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('payment_id', 'fk_payment_application_payment1')->references('id')->on('payment')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('payment_application', function(Blueprint $table)
		{
			$table->dropForeign('fk_payment_application_billing_account1');
			$table->dropForeign('fk_payment_application_invoice_item1');
			$table->dropForeign('fk_payment_application_payment1');
		});
	}

}
