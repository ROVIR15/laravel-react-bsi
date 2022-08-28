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
			$table->integer('id', true);
			$table->integer('budget_item_type_id')->index('fk_gl_budget_xref_1');
			$table->integer('general_ledger_accounts_id')->index('fk_gl_budget_xref_2');
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
