<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBomComponentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bom_component', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('bom_id')->index('fk_bom_component_bom1_idx');
			$table->integer('product_feature_id')->index('fk_bom_component_product_feature1_idx');
			$table->float('qty', 10, 0)->nullable();
			$table->float('consumption', 10, 0)->nullable();
			$table->float('allowance', 10, 0)->nullable();
			$table->float('unit_price')->nullable();
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
		Schema::drop('bom_component');
	}

}