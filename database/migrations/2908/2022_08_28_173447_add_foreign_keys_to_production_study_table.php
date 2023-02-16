<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProductionStudyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('production_study', function(Blueprint $table)
		{
			$table->foreign('product_id', 'fk_production_study_product_feature1')->references('id')->on('product')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('work_center_id', 'fk_production_study_work_center1')->references('id')->on('work_center')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('production_study', function(Blueprint $table)
		{
			$table->dropForeign('fk_production_study_product_feature1');
			$table->dropForeign('fk_production_study_work_center1');
		});
	}

}
