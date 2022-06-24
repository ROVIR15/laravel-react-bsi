<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGlBudgetXrefTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gl_budget_xref', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('budget_item_type_id')->index('fk_budget_item_type_has_general_ledger_accounts_budget_item_idx');
			$table->integer('general_ledger_accounts_id')->index('fk_gl_budget_xref_general_ledger_accounts1_idx');
			$table->decimal('allocation', 2, 0)->nullable();
			$table->date('from_date')->nullable();
			$table->date('thru_date')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gl_budget_xref');
	}

}
