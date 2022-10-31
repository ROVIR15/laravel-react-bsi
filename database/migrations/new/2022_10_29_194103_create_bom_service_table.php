<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBomServiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bom_service', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('bom_id');
			$table->integer('product_id');
			$table->float('unit_price', 10, 0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('bom_service');
	}

}
