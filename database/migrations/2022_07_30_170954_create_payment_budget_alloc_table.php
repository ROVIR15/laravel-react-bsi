<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentBudgetAllocTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment_budget_alloc', function(Blueprint $table)
		{
			$table->integer('payment_id')->index('fk_payment_has_budget_item_payment1_idx');
			$table->integer('budget_item_id')->index('fk_payment_has_budget_item_budget_item1_idx');
			$table->primary(['payment_id','budget_item_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('payment_budget_alloc');
	}

}
