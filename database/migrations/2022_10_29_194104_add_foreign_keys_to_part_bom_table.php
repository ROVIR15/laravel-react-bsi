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
			$table->foreign('product_id', 'fk_part_bom_product1')->references('id')->on('product')->onUpdate('NO ACTION')->onDelete('NO ACTION');
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
			$table->dropForeign('fk_part_bom_product1');
		});
	}

}
