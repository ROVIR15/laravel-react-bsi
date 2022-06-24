<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetHasBudgetStatusTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_has_budget_status_type', function(Blueprint $table)
		{
			$table->foreign('budget_id', 'fk_budget_has_budget_status_type_budget1')->references('id')->on('budget')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('budget_status_type_id', 'fk_budget_has_budget_status_type_budget_status_type1')->references('id')->on('budget_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_has_budget_status_type', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_has_budget_status_type_budget1');
			$table->dropForeign('fk_budget_has_budget_status_type_budget_status_type1');
		});
	}

}