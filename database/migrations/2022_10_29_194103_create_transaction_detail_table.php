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
			$table->integer('id', true);
			$table->string('amount', 45)->nullable();
			$table->string('flag', 45)->nullable();
			$table->integer('accounting_transaction_id')->index('fk_detail_acc_1');
			$table->integer('organization_gl_accounts_id')->index('fk_detail_acc_2');
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
