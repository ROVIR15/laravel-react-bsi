<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManufactureComponentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manufacture_component', function(Blueprint $table)
		{
			$table->foreign('manufacture_id', 'fk_manufacture_component_manufacture1')->references('id')->on('manufacture')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('manufacture_component', function(Blueprint $table)
		{
			$table->dropForeign('fk_manufacture_component_manufacture1');
		});
	}

}
