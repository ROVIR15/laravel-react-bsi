<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAgreementItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('agreement_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('agreement_id')->index('fk_agreement_item_agreement1_idx');
			$table->integer('product_feature_id')->index('fk_agreement_product_feature1');
			$table->integer('product_id')->index('fk_agreement_product1');
			$table->integer('qty');
			$table->integer('price');
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
		Schema::drop('agreement_item');
	}

}
