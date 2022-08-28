<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductionStudyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('production_study', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('product_id')->index('fk_production_study_product_feature1_idx');
			$table->integer('work_center_id')->index('fk_production_study_work_center1_idx');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('production_study');
	}

}
