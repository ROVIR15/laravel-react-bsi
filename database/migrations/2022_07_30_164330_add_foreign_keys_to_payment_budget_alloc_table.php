<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPaymentBudgetAllocTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('payment_budget_alloc', function(Blueprint $table)
		{
			$table->foreign('budget_item_id', 'fk_payment_has_budget_item_budget_item1')->references('id')->on('budget_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('payment_id', 'fk_payment_has_budget_item_payment1')->references('id')->on('payment')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('payment_budget_alloc', function(Blueprint $table)
		{
			$table->dropForeign('fk_payment_has_budget_item_budget_item1');
			$table->dropForeign('fk_payment_has_budget_item_payment1');
		});
	}

}
