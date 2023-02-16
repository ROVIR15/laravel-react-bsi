<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRequirementHasRequestItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('requirement_has_request_item', function(Blueprint $table)
		{
			$table->integer('requirement_id')->index('fk_req_to_req2');
			$table->integer('request_item_id')->index('fk_req_to_req1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('requirement_has_request_item');
	}

}
