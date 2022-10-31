<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAccountingPeriodTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('accounting_period', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('period_type_id')->index('fk_accnt_1');
			$table->date('from_date')->nullable();
			$table->date('thru_date')->nullable();
			$table->integer('internal_organization_id')->index('fk_accnt_2');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('accounting_period');
	}

}
