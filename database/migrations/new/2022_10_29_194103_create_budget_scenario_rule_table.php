<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetScenarioRuleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_scenario_rule', function(Blueprint $table)
		{
			$table->integer('budget_scenario_id')->index('fk_budget_scenario_r2');
			$table->integer('budget_item_type_id')->index('fk_budget_scenario_r1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_scenario_rule');
	}

}
