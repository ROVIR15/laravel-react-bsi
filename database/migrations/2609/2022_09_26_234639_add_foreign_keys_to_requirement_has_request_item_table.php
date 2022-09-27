<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRequirementHasRequestItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('requirement_has_request_item', function(Blueprint $table)
		{
			$table->foreign('request_item_id', 'fk_req_to_req1')->references('id')->on('request_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('requirement_id', 'fk_req_to_req2')->references('id')->on('requirement')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('requirement_has_request_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_req_to_req1');
			$table->dropForeign('fk_req_to_req2');
		});
	}

}
