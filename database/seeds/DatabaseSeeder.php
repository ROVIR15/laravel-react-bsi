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
        $this->call(AgreementTypeTableSeeder::class);
        $this->call(GoodsTableSeeder::class);
        $this->call(ProductTableSeeder::class);
        $this->call(ProductFeatureTableSeeder::class);
        $this->call(OrderTableSeeder::class);
        $this->call(OrderItemTableSeeder::class);
        $this->call(SalesOrderTableSeeder::class);
        $this->call(PurchaseOrderTableSeeder::class);
        $this->call(MonitoringBsiSewingTableSeeder::class);
        $this->call(PersonTableSeeder::class);
        $this->call(OrganizationTableSeeder::class);
        $this->call(PartyTableSeeder::class);
        $this->call(PartyRolesTableSeeder::class);
    }
}
