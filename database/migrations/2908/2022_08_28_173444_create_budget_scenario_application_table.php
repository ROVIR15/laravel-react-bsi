<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetScenarioApplicationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_scenario_application', function(Blueprint $table)
		{
			$table->integer('budget_item_id')->index('fk_bs_2');
			$table->integer('budget_id')->index('fk_bs_1');
			$table->integer('amount_change')->nullable();
			$table->decimal('percentage', 2, 0)->nullable();
			$table->primary(['budget_item_id','budget_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_scenario_application');
	}

}
