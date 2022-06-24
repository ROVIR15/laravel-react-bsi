<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrganizationGlAccountsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('organization_gl_accounts', function(Blueprint $table)
		{
			$table->foreign('general_ledger_accounts_id', 'fk_internal_organization_has_general_ledger_accounts_general_1')->references('id')->on('general_ledger_accounts')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('internal_organization_id', 'fk_internal_organization_has_general_ledger_accounts_internal1')->references('id')->on('internal_organization')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('organization_gl_accounts', function(Blueprint $table)
		{
			$table->dropForeign('fk_internal_organization_has_general_ledger_accounts_general_1');
			$table->dropForeign('fk_internal_organization_has_general_ledger_accounts_internal1');
		});
	}

}
