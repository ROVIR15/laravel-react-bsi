<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToQuoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('quote', function(Blueprint $table)
		{
			$table->foreign('party_id', 'fk_quote_buyer1')->references('id')->on('party')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('ship_to', 'fk_quote_buyer2')->references('id')->on('party')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('quote', function(Blueprint $table)
		{
			$table->dropForeign('fk_quote_buyer1');
			$table->dropForeign('fk_quote_buyer2');
		});
	}

}
