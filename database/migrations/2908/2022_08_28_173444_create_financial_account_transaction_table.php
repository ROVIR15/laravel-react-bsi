<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFinancialAccountTransactionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('financial_account_transaction', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('financial_account_id')->index('fk_financial_acc_tx1');
			$table->string('trx_date', 45)->nullable();
			$table->string('trx_type', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('financial_account_transaction');
	}

}
