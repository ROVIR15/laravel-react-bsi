<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget', function(Blueprint $table)
		{
			$table->foreign('budget_period_id', 'fk_budget_budget_period1')->references('id')->on('budget_period')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('budget_type_id', 'fk_budget_budget_type1')->references('id')->on('budget_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_budget_period1');
			$table->dropForeign('fk_budget_budget_type1');
		});
	}

}
