<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePartBomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('part_bom', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('product_id')->index('fk_part_bom_product1_idx');
			$table->string('qty_used', 45)->nullable();
			$table->string('description', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('part_bom');
	}

}
