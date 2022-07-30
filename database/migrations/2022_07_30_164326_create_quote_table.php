<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQuoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('quote', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->string('po_number', 150);
			$table->integer('party_id')->nullable()->index('fk_quote_buyer1')->comment('It could be contain of information vendor or buyer');
			$table->integer('ship_to')->nullable()->index('fk_quote_buyer2');
			$table->date('issue_date');
			$table->date('valid_thru');
			$table->date('delivery_date');
			$table->timestamps();
			$table->string('quote_type', 12)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('quote');
	}

}
