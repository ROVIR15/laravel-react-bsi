<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBudgetItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('budget_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('amount', 45)->nullable();
			$table->integer('budget_id')->index('fk_budget_item_budget1_idx');
			$table->integer('budget_item_type_id')->index('fk_budget_item_budget_item_type1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('budget_item');
	}

}
