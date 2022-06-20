<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetHasBudgetStatusTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_has_budget_status_type', function(Blueprint $table)
		{
			$table->integer('budget_id')->index('fk_budget_has_budget_status_type_budget1_idx');
			$table->integer('budget_status_type_id')->index('fk_budget_has_budget_status_type_budget_status_type1_idx');
			$table->string('comment', 45)->nullable();
			$table->primary(['budget_id','budget_status_type_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_has_budget_status_type');
	}

}
