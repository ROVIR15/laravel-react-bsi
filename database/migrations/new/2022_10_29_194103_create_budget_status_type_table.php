<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetStatusTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_status_type', function(Blueprint $table)
		{
			$table->integer('budget_id')->index('fk_budget_has_budget_status_type_budget1_idx');
			$table->integer('budget_status_type_id')->index('fk_budget_has_budget_status_type_budget_status_type1_idx');
			$table->string('comment', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_status_type');
	}

}
