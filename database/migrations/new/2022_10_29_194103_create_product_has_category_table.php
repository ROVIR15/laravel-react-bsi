<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductHasCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product_has_category', function(Blueprint $table)
		{
			$table->integer('product_id')->nullable()->index('fk_product_has_product_category_product1_idx');
			$table->integer('product_category_id')->nullable()->index('fk_product_has_product_category_product_category1_idx');
			$table->integer('product_sub_category_id')->nullable()->index('fk_3');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('product_has_category');
	}

}
