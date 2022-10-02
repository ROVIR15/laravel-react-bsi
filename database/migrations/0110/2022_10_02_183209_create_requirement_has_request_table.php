<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRequirementHasRequestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('requirement_has_request', function(Blueprint $table)
		{
			$table->integer('requirement_id')->index('fk_requirement_has_request_requirement1_idx');
			$table->integer('request_id')->index('fk_requirement_has_request_request1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('requirement_has_request');
	}

}
