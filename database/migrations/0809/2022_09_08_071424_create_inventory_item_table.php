<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInventoryItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('inventory_item', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('inventory_type_id')->nullable()->index('fk_inventory_inventory_type1_idx');
			$table->integer('facility_id')->nullable()->index('fk_inventory_facility1_idx');
			$table->integer('product_feature_id')->index('fk_inventory_product1_idx');
			$table->integer('qty_on_hand')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('inventory_item');
	}

}
