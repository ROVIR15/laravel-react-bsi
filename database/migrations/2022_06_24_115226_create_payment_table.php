<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('payment_method_type_id')->index('fk_payment_paymnet_method_type1');
			$table->date('effective_date')->nullable();
			$table->integer('ref_num')->nullable();
			$table->integer('amount')->nullable();
			$table->string('comment', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('payment');
	}

}
