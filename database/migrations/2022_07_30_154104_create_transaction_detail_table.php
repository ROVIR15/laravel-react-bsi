<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionDetailTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transaction_detail', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->string('amount', 45)->nullable();
			$table->string('flag', 45)->nullable();
			$table->integer('accounting_transaction_id')->index('fk_transaction_detail_accounting_transaction1_idx');
			$table->integer('organization_gl_accounts_id')->index('fk_transaction_detail_organizational_gl_accounts1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('transaction_detail');
	}

}
