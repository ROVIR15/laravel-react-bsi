<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrganizationGlAccountsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('organization_gl_accounts', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('internal_organization_id')->index('fk_org_acc_2');
			$table->integer('general_ledger_accounts_id')->index('fk_org_acc_1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('organization_gl_accounts');
	}

}
