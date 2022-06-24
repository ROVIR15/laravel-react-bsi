<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('goods_id')->nullable()->index('fk_product_goods1');
			$table->integer('part_id')->nullable()->index('fk_product_part1_idx');
			$table->integer('service_id')->nullable()->index('fk_product_service1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('product');
	}

}
