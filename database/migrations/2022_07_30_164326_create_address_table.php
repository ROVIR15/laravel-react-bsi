<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAddressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('address', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('party_id')->nullable()->index('fk_address_party1_idx');
			$table->string('city', 50);
			$table->string('province', 50);
			$table->string('country', 50);
			$table->string('street');
			$table->integer('postal_code');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('address');
	}

}
