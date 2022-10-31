<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetPeriodTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_period', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->date('from_date')->nullable();
			$table->date('thru_date')->nullable();
			$table->integer('period_type_id')->index('fk_budget_period_period_type1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_period');
	}

}
