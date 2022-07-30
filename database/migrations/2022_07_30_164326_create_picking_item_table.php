<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePickingItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('picking_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('pick_list_id')->index('fk_picking_item_pick_list1_idx');
			$table->integer('inventory_id')->index('fk_picking_item_inventory1_idx');
			$table->integer('qty')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('picking_item');
	}

}
