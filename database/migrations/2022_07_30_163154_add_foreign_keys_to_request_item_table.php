<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRequestItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('request_item', function(Blueprint $table)
		{
			$table->foreign('request_id', 'fk_request_item_request1')->references('id')->on('request')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('request_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_request_item_request1');
		});
	}

}
