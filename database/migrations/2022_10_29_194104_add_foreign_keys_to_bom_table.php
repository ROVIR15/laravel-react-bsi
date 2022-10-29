<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('bom', function(Blueprint $table)
		{
			$table->foreign('product_feature_id', 'fk_bom_product_feature_id')->references('id')->on('product_feature')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('product_id', 'fk_bom_product_id')->references('id')->on('product')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('bom', function(Blueprint $table)
		{
			$table->dropForeign('fk_bom_product_feature_id');
			$table->dropForeign('fk_bom_product_id');
		});
	}

}
