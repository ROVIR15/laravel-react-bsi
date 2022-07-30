<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRequestHasPartyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('request_has_party', function(Blueprint $table)
		{
			$table->foreign('party_id', 'fk_request_has_party_party1')->references('id')->on('party')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('request_id', 'fk_request_has_party_request1')->references('id')->on('request')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('request_has_party', function(Blueprint $table)
		{
			$table->dropForeign('fk_request_has_party_party1');
			$table->dropForeign('fk_request_has_party_request1');
		});
	}

}
