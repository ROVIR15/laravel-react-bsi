<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAccountingPeriodTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('accounting_period', function(Blueprint $table)
		{
			$table->foreign('internal_organization_id', 'fk_accounting_period_internal_organization1')->references('id')->on('internal_organization')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('period_type_id', 'fk_accounting_period_period_type1')->references('id')->on('period_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('accounting_period', function(Blueprint $table)
		{
			$table->dropForeign('fk_accounting_period_internal_organization1');
			$table->dropForeign('fk_accounting_period_period_type1');
		});
	}

}
