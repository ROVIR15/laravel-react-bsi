<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetPeriodTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_period', function(Blueprint $table)
		{
			$table->foreign('period_type_id', 'fk_budget_period_period_type1')->references('id')->on('period_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_period', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_period_period_type1');
		});
	}

}
