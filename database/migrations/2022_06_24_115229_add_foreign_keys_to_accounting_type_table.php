<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAccountingTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('accounting_type', function(Blueprint $table)
		{
			$table->foreign('accounting_transaction_id', 'fk_accounting_type_accounting_transaction1')->references('id')->on('accounting_transaction')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('accounting_type', function(Blueprint $table)
		{
			$table->dropForeign('fk_accounting_type_accounting_transaction1');
		});
	}

}
