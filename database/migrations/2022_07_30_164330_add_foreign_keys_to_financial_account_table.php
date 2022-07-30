<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToFinancialAccountTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('financial_account', function(Blueprint $table)
		{
			$table->foreign('financial_account_type_id', 'fk_financial_account_financial_account_type1')->references('id')->on('financial_account_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('financial_account', function(Blueprint $table)
		{
			$table->dropForeign('fk_financial_account_financial_account_type1');
		});
	}

}
