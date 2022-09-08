<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRoutingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('routing', function(Blueprint $table)
		{
			$table->foreign('work_center_id', 'fk_routing_work_center1')->references('id')->on('work_center')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('routing', function(Blueprint $table)
		{
			$table->dropForeign('fk_routing_work_center1');
		});
	}

}
