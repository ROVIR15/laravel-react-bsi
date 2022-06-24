<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetScenarioRuleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_scenario_rule', function(Blueprint $table)
		{
			$table->foreign('budget_item_type_id', 'fk_budget_scenario_has_budget_item_type_budget_item_type1')->references('id')->on('budget_item_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('budget_scenario_id', 'fk_budget_scenario_has_budget_item_type_budget_scenario1')->references('id')->on('budget_scenario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_scenario_rule', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_scenario_has_budget_item_type_budget_item_type1');
			$table->dropForeign('fk_budget_scenario_has_budget_item_type_budget_scenario1');
		});
	}

}
