<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetReviewTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_review', function(Blueprint $table)
		{
			$table->integer('budget_review_result_type_id')->index('fk_budget_rev2');
			$table->integer('budget_id')->index('fk_budget_rev1');
			$table->date('review_date')->nullable();
			$table->primary(['budget_review_result_type_id','budget_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_review');
	}

}
