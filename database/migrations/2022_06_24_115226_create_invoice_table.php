<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInvoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('invoice_date', 45);
			$table->integer('sold_to')->nullable()->index('fk_sold_to_party1');
			$table->string('description', 45)->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('invoice');
	}

}
