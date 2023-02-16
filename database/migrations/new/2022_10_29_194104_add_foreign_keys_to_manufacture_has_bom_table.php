<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManufactureHasBomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manufacture_has_bom', function(Blueprint $table)
		{
			$table->foreign('bom_id', 'fk_manufacture_has_bom_bom1')->references('id')->on('bom')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('manufacture_id', 'fk_manufacture_has_bom_manufacture1')->references('id')->on('manufacture')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('manufacture_has_bom', function(Blueprint $table)
		{
			$table->dropForeign('fk_manufacture_has_bom_bom1');
			$table->dropForeign('fk_manufacture_has_bom_manufacture1');
		});
	}

}
