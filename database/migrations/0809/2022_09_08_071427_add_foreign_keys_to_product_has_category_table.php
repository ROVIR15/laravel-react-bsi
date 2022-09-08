<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProductHasCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('product_has_category', function(Blueprint $table)
		{
			$table->foreign('product_id', 'fk_1')->references('id')->on('product')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('product_category_id', 'fk_2')->references('id')->on('product_category')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('product_has_category', function(Blueprint $table)
		{
			$table->dropForeign('fk_1');
			$table->dropForeign('fk_2');
		});
	}

}
