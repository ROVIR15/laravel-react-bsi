<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFinancialAccountRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('financial_account_role', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('financial_account_id')->index('fk_finance_acc_role1');
			$table->integer('financial_account_role_type_id')->index('fk_finance_acc_role2');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('financial_account_role');
	}

}
