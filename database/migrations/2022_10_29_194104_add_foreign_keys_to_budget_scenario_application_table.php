<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetScenarioApplicationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_scenario_application', function(Blueprint $table)
		{
			$table->foreign('budget_id', 'fk_bs_1')->references('id')->on('budget')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('budget_item_id', 'fk_bs_2')->references('id')->on('budget_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_scenario_application', function(Blueprint $table)
		{
			$table->dropForeign('fk_bs_1');
			$table->dropForeign('fk_bs_2');
		});
	}

}
