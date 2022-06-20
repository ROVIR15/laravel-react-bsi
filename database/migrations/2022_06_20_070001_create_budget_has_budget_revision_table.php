<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetHasBudgetRevisionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_has_budget_revision', function(Blueprint $table)
		{
			$table->integer('budget_id')->index('fk_budget_has_budget_revision_budget1_idx');
			$table->integer('budget_revision_id')->index('fk_budget_has_budget_revision_budget_revision1_idx');
			$table->string('reason', 45)->nullable();
			$table->primary(['budget_id','budget_revision_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_has_budget_revision');
	}

}
