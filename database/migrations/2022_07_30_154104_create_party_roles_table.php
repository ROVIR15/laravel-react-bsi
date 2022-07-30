<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePartyRolesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('party_roles', function(Blueprint $table)
		{
			$table->integer('id');
			$table->integer('party_id')->nullable()->index('fk_party_roles_party1_idx');
			$table->integer('relationship_id')->index('fk_party_roles_relantionship1_idx');
			$table->primary(['id','relationship_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('party_roles');
	}

}
