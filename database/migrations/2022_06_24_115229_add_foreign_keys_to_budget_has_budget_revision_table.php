<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetHasBudgetRevisionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_has_budget_revision', function(Blueprint $table)
		{
			$table->foreign('budget_id', 'fk_budget_has_budget_revision_budget1')->references('id')->on('budget')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('budget_revision_id', 'fk_budget_has_budget_revision_budget_revision1')->references('id')->on('budget_revision')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_has_budget_revision', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_has_budget_revision_budget1');
			$table->dropForeign('fk_budget_has_budget_revision_budget_revision1');
		});
	}

}
