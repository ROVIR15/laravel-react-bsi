<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(PagesTableSeeder::class);
        $this->call(FacilityTypeTableSeeder::class);
        $this->call(StatusTableSeeder::class);
        $this->call(PagesAccessTableSeeder::class);
        $this->call(RoleTypeTableSeeder::class);
        $this->call(ProductSubCategoryTableSeeder::class);
        $this->call(ProductCategoryTableSeeder::class);
        $this->call(FacilityTableSeeder::class);
        $this->call(RelationshipTableSeeder::class);
        $this->call(ShipmentTypeStatusTableSeeder::class);
    }
}
