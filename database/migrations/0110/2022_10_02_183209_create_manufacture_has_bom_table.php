<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManufactureHasBomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manufacture_has_bom', function(Blueprint $table)
		{
			$table->integer('bom_id')->index('fk_manufacture_has_bom_bom1_idx');
			$table->integer('manufacture_id')->index('fk_manufacture_has_bom_manufacture1_idx1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('manufacture_has_bom');
	}

}
