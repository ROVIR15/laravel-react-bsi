<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProcessStudyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('process_study', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('production_study_id')->index('fk_study_operation_production_study1_idx');
			$table->integer('party_id')->index('fk_study_operation_party1_idx');
			$table->integer('process_id')->index('fk_process_study_process1_idx');
			$table->float('seq_1', 10, 0)->default(0);
			$table->float('seq_2', 10, 0)->default(0);
			$table->float('seq_3', 10, 0)->default(0);
			$table->integer('target')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('process_study');
	}

}
