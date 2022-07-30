<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManufactureStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manufacture_status', function(Blueprint $table)
		{
			$table->integer('manufacture_status_type_id')->index('fk_manufacture_status_type_has_manufacture_manufacture_stat_idx');
			$table->integer('manufacture_id1')->index('fk_manufacture_status_manufacture1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('manufacture_status');
	}

}
