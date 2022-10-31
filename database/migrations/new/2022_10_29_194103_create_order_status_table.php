<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_status', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('status_type', 50);
			$table->text('description', 65535)->nullable();
			$table->integer('order_id')->index('fk_order_status_order1_idx');
			$table->integer('user_id');
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
		Schema::drop('order_status');
	}

}
