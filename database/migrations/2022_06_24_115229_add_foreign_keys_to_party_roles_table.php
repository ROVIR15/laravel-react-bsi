<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPartyRolesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('party_roles', function(Blueprint $table)
		{
			$table->foreign('party_id', 'fk_party_roles_party1')->references('id')->on('party')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('relationship_id', 'fk_party_roles_relantionship1')->references('id')->on('relationship')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('party_roles', function(Blueprint $table)
		{
			$table->dropForeign('fk_party_roles_party1');
			$table->dropForeign('fk_party_roles_relantionship1');
		});
	}

}
