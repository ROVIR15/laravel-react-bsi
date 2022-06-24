<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRequestHasPartyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('request_has_party', function(Blueprint $table)
		{
			$table->integer('request_id')->index('fk_request_has_party_request1_idx');
			$table->integer('party_id')->index('fk_request_has_party_party1_idx');
			$table->primary(['request_id','party_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('request_has_party');
	}

}
