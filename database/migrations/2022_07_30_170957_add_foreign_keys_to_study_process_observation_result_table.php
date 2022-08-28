<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToStudyProcessObservationResultTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('study_process_observation_result', function(Blueprint $table)
		{
			$table->foreign('observation_result_id', 'fk_study_obv1')->references('id')->on('observation_result')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('process_study_id', 'fk_study_obv2')->references('id')->on('process_study')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('study_process_observation_result', function(Blueprint $table)
		{
			$table->dropForeign('fk_study_obv1');
			$table->dropForeign('fk_study_obv2');
		});
	}

}
