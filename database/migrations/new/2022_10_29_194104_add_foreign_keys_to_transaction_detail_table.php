<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTransactionDetailTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('transaction_detail', function(Blueprint $table)
		{
			$table->foreign('accounting_transaction_id', 'fk_detail_acc_1')->references('id')->on('accounting_transaction')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('transaction_detail', function(Blueprint $table)
		{
			$table->dropForeign('fk_detail_acc_1');
		});
	}

}
