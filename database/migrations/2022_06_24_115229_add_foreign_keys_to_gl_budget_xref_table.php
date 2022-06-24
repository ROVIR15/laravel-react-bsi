<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGlBudgetXrefTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gl_budget_xref', function(Blueprint $table)
		{
			$table->foreign('budget_item_type_id', 'fk_budget_item_type_has_general_ledger_accounts_budget_item_t1')->references('id')->on('budget_item_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('general_ledger_accounts_id', 'fk_gl_budget_xref_general_ledger_accounts1')->references('id')->on('general_ledger_accounts')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gl_budget_xref', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_item_type_has_general_ledger_accounts_budget_item_t1');
			$table->dropForeign('fk_gl_budget_xref_general_ledger_accounts1');
		});
	}

}
