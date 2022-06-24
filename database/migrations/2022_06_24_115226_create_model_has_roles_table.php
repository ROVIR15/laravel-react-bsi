<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateModelHasRolesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('model_has_roles', function(Blueprint $table)
		{
			$table->integer('role_id')->unsigned()->index('model_has_roles_role_id_foreign');
			$table->string('model_type', 191);
			$table->bigInteger('model_id')->unsigned();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('model_has_roles');
	}

}
