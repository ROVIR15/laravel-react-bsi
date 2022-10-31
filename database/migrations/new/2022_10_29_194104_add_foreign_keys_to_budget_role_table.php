<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budget_role', function(Blueprint $table)
		{
			$table->foreign('budget_id', 'fk_budget_role_budget1')->references('id')->on('budget')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budget_role', function(Blueprint $table)
		{
			$table->dropForeign('fk_budget_role_budget1');
		});
	}

}
