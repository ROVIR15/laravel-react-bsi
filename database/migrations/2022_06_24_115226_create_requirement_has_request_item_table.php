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
			$table->integer('requirement_id')->index('fk_requirement_has_request_item_requirement1_idx');
			$table->integer('request_item_id')->index('fk_requirement_has_request_item_request_item1_idx');
			$table->primary(['requirement_id','request_item_id']);
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
