<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('product', function(Blueprint $table)
		{
			$table->foreign('goods_id', 'fk_product_goods1')->references('id')->on('goods')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('part_id', 'fk_product_part1')->references('id')->on('part')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('service_id', 'fk_product_service1')->references('id')->on('service')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('product', function(Blueprint $table)
		{
			$table->dropForeign('fk_product_goods1');
			$table->dropForeign('fk_product_part1');
			$table->dropForeign('fk_product_service1');
		});
	}

}
