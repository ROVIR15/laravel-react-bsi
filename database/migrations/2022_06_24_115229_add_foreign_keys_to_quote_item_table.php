<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToQuoteItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('quote_item', function(Blueprint $table)
		{
			$table->foreign('product_feature_id', 'fk_quote_item_product1')->references('id')->on('product_feature')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('quote_id', 'fk_quote_item_quote1')->references('id')->on('quote')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('request_item_id', 'fk_quote_item_request_item1')->references('id')->on('request_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('quote_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_quote_item_product1');
			$table->dropForeign('fk_quote_item_quote1');
			$table->dropForeign('fk_quote_item_request_item1');
		});
	}

}
