<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPartBomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('part_bom', function(Blueprint $table)
		{
			$table->foreign('product_id', 'fk_product_id')->references('id')->on('product')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('part_bom', function(Blueprint $table)
		{
			$table->dropForeign('fk_product_id');
		});
	}

}
