<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePagesAccessTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('pages_access', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->bigInteger('users_id')->unsigned()->nullable()->index('fk_pages_access_users1_idx');
			$table->integer('pages_id')->nullable()->index('fk_pages_access_pages1_idx');
			$table->string('name', 45)->nullable();
			$table->boolean('insert')->nullable();
			$table->boolean('delete')->nullable();
			$table->boolean('edit')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('pages_access');
	}

}
