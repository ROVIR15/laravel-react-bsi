<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInventoryItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('inventory_item', function(Blueprint $table)
		{
			$table->foreign('facility_id', 'fk_inventory_facility1')->references('id')->on('facility')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('inventory_type_id', 'fk_inventory_inventory_type1')->references('id')->on('inventory_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('inventory_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_inventory_facility1');
			$table->dropForeign('fk_inventory_inventory_type1');
		});
	}

}
