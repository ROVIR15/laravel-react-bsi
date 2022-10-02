<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQuoteRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('quote_role', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('quote_id')->index('fk_quote_role_quote1_idx');
			$table->integer('party_id');
			$table->string('status', 50);
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
		Schema::drop('quote_role');
	}

}
