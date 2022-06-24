<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPickingItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('picking_item', function(Blueprint $table)
		{
			$table->foreign('inventory_id', 'fk_picking_item_inventory1')->references('id')->on('inventory_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('pick_list_id', 'fk_picking_item_pick_list1')->references('id')->on('pick_list')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('picking_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_picking_item_inventory1');
			$table->dropForeign('fk_picking_item_pick_list1');
		});
	}

}
