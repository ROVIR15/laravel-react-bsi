<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQuoteItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('quote_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('quote_id')->nullable()->index('fk_quote_item_quote1_idx');
			$table->integer('request_item_id')->nullable()->index('fk_quote_item_request_item1_idx');
			$table->integer('product_feature_id')->nullable()->index('fk_quote_item_product1');
			$table->integer('qty')->nullable();
			$table->string('unit_price', 45)->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('quote_item');
	}

}
