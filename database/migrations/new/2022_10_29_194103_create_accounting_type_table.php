<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAccountingTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('accounting_type', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('description', 45)->nullable();
			$table->integer('accounting_transaction_id')->index('fk_accounting_type_accounting_transaction1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('accounting_type');
	}

}
