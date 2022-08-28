<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProductFeatureTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('product_feature', function(Blueprint $table)
		{
			$table->foreign('price_component_id', 'fk_product_feature_price_component1')->references('id')->on('price_component')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('product_id', 'fk_product_feature_product1')->references('id')->on('product')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('product_feature', function(Blueprint $table)
		{
			$table->dropForeign('fk_product_feature_price_component1');
			$table->dropForeign('fk_product_feature_product1');
		});
	}

}
