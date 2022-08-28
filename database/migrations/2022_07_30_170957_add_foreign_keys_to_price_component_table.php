<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPriceComponentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('price_component', function(Blueprint $table)
		{
			$table->foreign('agreement_item_id', 'fk_price_component_agreement_item1')->references('id')->on('agreement_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('price_component', function(Blueprint $table)
		{
			$table->dropForeign('fk_price_component_agreement_item1');
		});
	}

}
