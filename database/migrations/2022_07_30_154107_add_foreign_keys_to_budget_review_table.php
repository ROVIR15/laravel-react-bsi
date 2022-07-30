<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetReviewTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_review', function(Blueprint $table)
		{
			$table->foreign('budget_id', 'fk_budget_review_result_type_has_budget_budget1')->references('id')->on('budget')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('budget_review_result_type_id', 'fk_budget_review_result_type_has_budget_budget_review_result_1')->references('id')->on('budget_review_result_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_review', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_review_result_type_has_budget_budget1');
			$table->dropForeign('fk_budget_review_result_type_has_budget_budget_review_result_1');
		});
	}

}
