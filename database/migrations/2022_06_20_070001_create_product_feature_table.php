<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductFeatureTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product_feature', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('product_id')->nullable()->index('fk_product_feature_product1_idx');
			$table->string('color', 45)->nullable();
			$table->string('size', 45)->nullable();
			$table->integer('price_component_id')->nullable()->index('fk_product_feature_price_component1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('product_feature');
	}

}
