<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBomComponentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('bom_component', function(Blueprint $table)
		{
			$table->foreign('bom_id', 'fk_bom_component_bom1')->references('id')->on('bom')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('product_feature_id', 'fk_bom_component_product_feature_id1')->references('id')->on('product_feature')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('bom_component', function(Blueprint $table)
		{
			$table->dropForeign('fk_bom_component_bom1');
			$table->dropForeign('fk_bom_component_product_feature_id1');
		});
	}

}
