<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProcessStudyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('process_study', function(Blueprint $table)
		{
			$table->foreign('production_study_id', 'fk_process_study_2')->references('id')->on('production_study')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('process_id', 'fk_process_study_process1')->references('id')->on('process')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('party_id', 'fk_study_operation_party1')->references('id')->on('party')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('process_study', function(Blueprint $table)
		{
			$table->dropForeign('fk_process_study_2');
			$table->dropForeign('fk_process_study_process1');
			$table->dropForeign('fk_study_operation_party1');
		});
	}

}
