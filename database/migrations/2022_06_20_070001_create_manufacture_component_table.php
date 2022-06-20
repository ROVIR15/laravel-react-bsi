<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManufactureComponentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manufacture_component', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('product_feature_id')->index('fk_manufacture_component_product_feature1_idx');
			$table->integer('manufacture_id')->index('fk_manufacture_component_manufacture1_idx');
			$table->integer('qty_keep');
			$table->integer('qty_to_be_consumed')->nullable()->default(0);
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
		Schema::drop('manufacture_component');
	}

}
