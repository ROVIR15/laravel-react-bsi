<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManufactureTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manufacture', function(Blueprint $table)
		{
			$table->foreign('party_id', 'fk_manufacture_party1')->references('id')->on('party')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('manufacture', function(Blueprint $table)
		{
			$table->dropForeign('fk_manufacture_party1');
		});
	}

}
