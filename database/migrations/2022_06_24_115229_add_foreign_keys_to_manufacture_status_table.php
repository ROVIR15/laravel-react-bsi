<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManufactureStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manufacture_status', function(Blueprint $table)
		{
			$table->foreign('manufacture_id1', 'fk_manufacture_status_manufacture1')->references('id')->on('manufacture')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('manufacture_status_type_id', 'fk_manufacture_status_type_has_manufacture_manufacture_status1')->references('id')->on('manufacture_status_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('manufacture_status', function(Blueprint $table)
		{
			$table->dropForeign('fk_manufacture_status_manufacture1');
			$table->dropForeign('fk_manufacture_status_type_has_manufacture_manufacture_status1');
		});
	}

}
