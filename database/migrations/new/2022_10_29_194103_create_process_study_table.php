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
			$table->integer('production_study_id')->index('fk_stud_oprt1');
			$table->integer('party_id')->index('fk_stud_oprt2');
			$table->integer('process_id')->index('fk_process_study_2');
			$table->float('seq_1', 10, 0)->default(0);
			$table->float('seq_2', 10, 0)->default(0);
			$table->float('seq_3', 10, 0)->default(0);
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
