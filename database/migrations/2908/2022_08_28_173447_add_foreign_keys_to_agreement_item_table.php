<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAgreementItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('agreement_item', function(Blueprint $table)
		{
			$table->foreign('agreement_id', 'fk_agreement_item_agreement1')->references('id')->on('agreement')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('agreement_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_agreement_item_agreement1');
		});
	}

}
