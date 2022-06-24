<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePartyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('party', function(Blueprint $table)
		{
			$table->integer('id')->primary();
			$table->integer('person_party_id')->nullable()->index('fk_party_person1_idx');
			$table->string('name', 50);
			$table->string('email', 50);
			$table->string('npwp', 20);
			$table->integer('agreement_role_id')->nullable()->index('fk_party_agreement_role1_idx');
			$table->integer('organization_party_id')->nullable()->index('fk_party_organization1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('party');
	}

}
