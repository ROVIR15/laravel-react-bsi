<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFinancialAccountTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('financial_account', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('financial_account_type_id')->index('fk_financial_account_financial_account_type1_idx');
			$table->string('account_name', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('financial_account');
	}

}
