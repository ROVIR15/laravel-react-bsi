<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToQuoteRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('quote_role', function(Blueprint $table)
		{
			$table->foreign('quote_id', 'fk_quote_role_quote1')->references('id')->on('quote')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('quote_role', function(Blueprint $table)
		{
			$table->dropForeign('fk_quote_role_quote1');
		});
	}

}
