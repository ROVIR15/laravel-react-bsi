<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentApplicationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment_application', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('payment_id')->index('fk_payment_application_payment1_idx');
			$table->string('amount_applied', 45)->nullable();
			$table->integer('billing_account_id')->index('fk_payment_application_billing_account1_idx');
			$table->integer('invoice_item_id')->index('fk_payment_application_invoice_item1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('payment_application');
	}

}
