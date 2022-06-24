<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRequestItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('request_item', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('request_id')->index('fk_request_item_request1_idx');
			$table->integer('product_feature_id')->nullable()->index('fk_request_item_product_feature1');
			$table->integer('qty');
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
		Schema::drop('request_item');
	}

}
