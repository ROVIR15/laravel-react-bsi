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
			$table->integer('budget_id')->index('fk_b_status_2');
			$table->integer('budget_status_type_id')->index('fk_b_status_1');
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
