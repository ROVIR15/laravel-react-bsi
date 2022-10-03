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
        $this->call(PersonTableSeeder::class);
        $this->call(OrganizationTableSeeder::class);
        $this->call(PartyTableSeeder::class);
        $this->call(PartyRolesTableSeeder::class);
        $this->call(RoleTypeTableSeeder::class);
        $this->call(RelationshipTableSeeder::class);
        $this->call(AddressTableSeeder::class);
        $this->call(GoodsTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
        $this->call(ProductTableSeeder::class);
        $this->call(ProductFeatureTableSeeder::class);
        $this->call(ProductSubCategoryTableSeeder::class);
        $this->call(ProductCategoryTableSeeder::class);
        $this->call(ProductHasCategoryTableSeeder::class);
        $this->call(FacilityTableSeeder::class);
        $this->call(ShipmentTypeStatusTableSeeder::class);
        $this->call(AgreementTypeTableSeeder::class);
        $this->call(QuoteTableSeeder::class);
        $this->call(QuoteItemTableSeeder::class);
        $this->call(SalesOrderTableSeeder::class);
        $this->call(PurchaseOrderTableSeeder::class);
        $this->call(OrderTableSeeder::class);
        $this->call(OrderItemTableSeeder::class);
        $this->call(MonitoringBsiSewingTableSeeder::class);
        $this->call(MonitoringBsiQcTableSeeder::class);
        $this->call(MonitoringBsiSupermarketTableSeeder::class);
        $this->call(BomTableSeeder::class);
        $this->call(WorkCenterTableSeeder::class);
        $this->call(OperationTableSeeder::class);
        $this->call(BomComponentTableSeeder::class);
        $this->call(BomServiceTableSeeder::class);
        $this->call(ApprovalTableSeeder::class);
    }
}

// php artisan iseed users,address,pages,facility_type,status,pages_access,person,organization,party,party_roles,role_type,relationship,product_has_category,product_sub_category,product_category,facility,
// php artisan iseed shipment_type_status,agreement_type,goods,service,product,product_feature,order,order_item,sales_order,purchase_order,monitoring_bsi_sewing,monitoring_bsi_supermarket,monitoring_bsi_qc,quote,quote_item,bom,
// php artisan iseed operation,bom_component,bom_service,approval