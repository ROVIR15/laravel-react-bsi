<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStudyProcessObservationResultTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('study_process_observation_result', function(Blueprint $table)
		{
			$table->integer('process_study_id')->index('fk_study_obv2');
			$table->integer('observation_result_id')->index('fk_study_obv1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('study_process_observation_result');
	}

}
