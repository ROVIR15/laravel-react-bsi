<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAgreementRoleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('agreement_role', function(Blueprint $table)
		{
			$table->foreign('agreement_id', 'fk_agreement_role_agreement1')->references('id')->on('agreement')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('agreement_role', function(Blueprint $table)
		{
			$table->dropForeign('fk_agreement_role_agreement1');
		});
	}

}
