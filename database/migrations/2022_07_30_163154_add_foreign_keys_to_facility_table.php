<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToFacilityTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('facility', function(Blueprint $table)
		{
			$table->foreign('facility_type_id', 'fk_facility_facility_type1')->references('id')->on('facility_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('facility', function(Blueprint $table)
		{
			$table->dropForeign('fk_facility_facility_type1');
		});
	}

}
