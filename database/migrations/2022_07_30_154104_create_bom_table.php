<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bom', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('product_id')->index('fk_product_id');
			$table->integer('product_feature_id')->nullable()->index('fk_bom_product_feature_id_idx');
			$table->string('name', 45)->nullable();
			$table->integer('qty')->nullable();
			$table->string('company_name', 45)->nullable();
			$table->date('start_date');
			$table->date('end_date');
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
		Schema::drop('bom');
	}

}
