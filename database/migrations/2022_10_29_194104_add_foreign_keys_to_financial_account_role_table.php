<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToFinancialAccountRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('financial_account_role', function(Blueprint $table)
		{
			$table->foreign('financial_account_id', 'fk_finance_acc_role1')->references('id')->on('financial_account')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('financial_account_role_type_id', 'fk_finance_acc_role2')->references('id')->on('financial_account_role_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('financial_account_role', function(Blueprint $table)
		{
			$table->dropForeign('fk_finance_acc_role1');
			$table->dropForeign('fk_finance_acc_role2');
		});
	}

}
