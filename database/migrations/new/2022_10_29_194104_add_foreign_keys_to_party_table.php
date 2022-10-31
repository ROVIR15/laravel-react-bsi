<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPartyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('party', function(Blueprint $table)
		{
			$table->foreign('agreement_role_id', 'fk_party_agreement_role1')->references('id')->on('agreement_role')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('organization_party_id', 'fk_party_organization1')->references('id')->on('organization')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('person_party_id', 'fk_party_person1')->references('id')->on('person')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('party', function(Blueprint $table)
		{
			$table->dropForeign('fk_party_agreement_role1');
			$table->dropForeign('fk_party_organization1');
			$table->dropForeign('fk_party_person1');
		});
	}

}
