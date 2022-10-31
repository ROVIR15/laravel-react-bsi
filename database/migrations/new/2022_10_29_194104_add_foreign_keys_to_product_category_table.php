<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProductCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('product_category', function(Blueprint $table)
		{
			$table->foreign('sub_cat', 'fk_sub_cat1')->references('id')->on('product_sub_category')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('product_category', function(Blueprint $table)
		{
			$table->dropForeign('fk_sub_cat1');
		});
	}

}
