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
        // $this->call(AccountingTypeTableSeeder::class);
        // $this->call(AgreementTypeTableSeeder::class);
        // $this->call(BudgetHasBudgetStatusTypeTableSeeder::class);
        // $this->call(BudgetItemTypeTableSeeder::class);
        // $this->call(BudgetReviewResultTypeTableSeeder::class);
        // $this->call(BudgetStatusTypeTableSeeder::class);
        // $this->call(BudgetTypeTableSeeder::class);
        // $this->call(ContactMechanismTypeTableSeeder::class);
        // $this->call(FacilityTypeTableSeeder::class);
        // $this->call(FinancialAccountRoleTypeTableSeeder::class);
        // $this->call(FinancialAccountTypeTableSeeder::class);
        // $this->call(GlTypeTableSeeder::class);
        // $this->call(InventoryTypeTableSeeder::class);
        // $this->call(InvoiceItemTypeTableSeeder::class);
        // $this->call(InvoiceStatusTypeTableSeeder::class);
        // $this->call(InvoiceTypeTableSeeder::class);
        // $this->call(ManufactureStatusTypeTableSeeder::class);
        // $this->call(PaymentMethodTypeTableSeeder::class);
        // $this->call(PeriodTypeTableSeeder::class);
        // $this->call(RoleTypeTableSeeder::class);
        // $this->call(ShipmentTypeTableSeeder::class);
        // $this->call(ShipmentTypeStatusTableSeeder::class);
        // $this->call(TermTypeTableSeeder::class);
        // $this->call(TrxTypeTableSeeder::class);
        // $this->call(AgreementRoleTableSeeder::class);
        // $this->call(BudgetRoleTableSeeder::class);
        // $this->call(FinancialAccountRoleTableSeeder::class);
        // $this->call(ModelHasRolesTableSeeder::class);
        // $this->call(OrderRoleTableSeeder::class);
        // $this->call(QuoteRoleTableSeeder::class);
        // $this->call(RoleHasPermissionsTableSeeder::class);
        // $this->call(ShipmentRoleTableSeeder::class);
        // $this->call(FileUploadTableSeeder::class);
        // $this->call(UsersTableSeeder::class);
        // $this->call(OrganizationTableSeeder::class);
        // $this->call(PersonTableSeeder::class);
        $this->call(PartyTableSeeder::class);
        // $this->call(AddressTableSeeder::class);
        // $this->call(PagesTableSeeder::class);
        // $this->call(StatusTableSeeder::class);
        // $this->call(PagesAccessTableSeeder::class);
        // $this->call(RelationshipTableSeeder::class);
        // $this->call(ProductHasCategoryTableSeeder::class);
        // $this->call(ProductSubCategoryTableSeeder::class);
        // $this->call(ProductCategoryTableSeeder::class);
        // $this->call(FactoryTableSeeder::class);
        // $this->call(FacilityTableSeeder::class);
        // $this->call(GoodsTableSeeder::class);
        // $this->call(ServiceTableSeeder::class);
        // $this->call(ProductTableSeeder::class);
        // $this->call(ProductFeatureTableSeeder::class);
        // $this->call(WorkCenterTableSeeder::class);
        // $this->call(QuoteTableSeeder::class);
        // $this->call(QuoteItemTableSeeder::class);
        // $this->call(OrderTableSeeder::class);
        // $this->call(OrderItemTableSeeder::class);
        // $this->call(SalesOrderTableSeeder::class);
        // $this->call(PurchaseOrderTableSeeder::class);
        // $this->call(MonitoringBsiCuttingTableSeeder::class);
        // $this->call(MonitoringBsiSewingTableSeeder::class);
        // $this->call(MonitoringBsiSupermarketTableSeeder::class);
        // $this->call(MonitoringBsiQcTableSeeder::class);
        // $this->call(BomTableSeeder::class);
        // $this->call(OperationTableSeeder::class);
        // $this->call(BomComponentTableSeeder::class);
        // $this->call(BomServiceTableSeeder::class);
        // $this->call(ApprovalTableSeeder::class);
        // $this->call(ShipmentTableSeeder::class);
        // $this->call(ShipmentItemTableSeeder::class);
        // $this->call(InvoiceTableSeeder::class);
        // $this->call(InvoiceItemTableSeeder::class);
        // $this->call(InvoiceReceiptTableSeeder::class);
        // $this->call(InvoiceReceiptItemsTableSeeder::class);
        // $this->call(InvoiceStatusTableSeeder::class);
        // $this->call(InvoiceTermTableSeeder::class);
        // $this->call(PaymentTableSeeder::class);
        // $this->call(PaymentBudgetAllocTableSeeder::class);
        // $this->call(FinancialAccountTableSeeder::class);
        // $this->call(FinancialAccountTransactionTableSeeder::class);
        // $this->call(BomStatusTableSeeder::class);
        // $this->call(BudgetStatusTableSeeder::class);
        // $this->call(CompletionStatusTableSeeder::class);
        // $this->call(ManufactureStatusTableSeeder::class);
        // $this->call(OrderCompletionStatusTableSeeder::class);
        // $this->call(OrderStatusTableSeeder::class);
        // $this->call(QuoteStatusTableSeeder::class);
        // $this->call(RequestStatusTableSeeder::class);
        // $this->call(ShipmentStatusTableSeeder::class);
        // $this->call(BudgetHasBudgetRevisionTableSeeder::class);
        // $this->call(FactoryHasFacilityTableSeeder::class);
        // $this->call(InvoiceHasInvoiceTypeTableSeeder::class);
        // $this->call(InvoiceHasShipmentTableSeeder::class);
        // $this->call(ManufactureHasBomTableSeeder::class);
        // $this->call(ModelHasPermissionsTableSeeder::class);
        // $this->call(OrderItemHasGoodsTableSeeder::class);
        // $this->call(OrderItemHasProductTableSeeder::class);
        // $this->call(PartyHasContactMechanismTableSeeder::class);
        // $this->call(PaymentHasInvoiceTableSeeder::class);
        // $this->call(PurchaseInvoiceTableSeeder::class);
        // $this->call(RequestHasPartyTableSeeder::class);
        // $this->call(RequirementHasRequestTableSeeder::class);
        // $this->call(RequirementHasRequestItemTableSeeder::class);
        // $this->call(FacilityTargetTableSeeder::class);
        // $this->call(PartyRolesTableSeeder::class);
    }
}

// php artisan iseed users,address,pages,facility_type,status,pages_access,person,organization,party,party_roles,role_type,relationship,product_has_category,product_sub_category,product_category,facility,
// php artisan iseed shipment_type_status,agreement_type,goods,service,product,product_feature,order,order_item,sales_order,purchase_order,monitoring_bsi_sewing,monitoring_bsi_supermarket,monitoring_bsi_qc,quote,quote_item,bom,
// php artisan iseed operation,bom_component,bom_service,approval
// php artisan iseed monitoring_bsi_cutting, shipment, shipment_item, shipment_type_status, shipment_type, shipment_status
// php artisan iseed facility_target, bom_status
// php artisan iseed goods_receipt, goods_receipt_items

// type
// php artisan iseed accounting_type,agreement_type,budget_has_budget_status_type,budget_item_type,budget_review_result_type,budget_status_type,budget_type,contact_mechanism_type,facility_type,financial_account_role_type,financial_account_type,gl_type,inventory_type,invoice_has_invoice_type,invoice_item_type,invoice_status_type,invoice_type,manufacture_status_type,payment_method_type,period_type,role_type,shipment_type,shipment_type_status,term_type,trx_typeHid,
// roles
// agreement_role, budget_role, financial_account_role, financial_account_role_type, model_has_roles, order_role, party_roles, quote_role, role_has_permissions, role_type, shipment_role
// file_upload, users,address,pages,status,pages_access,person,organization,party,relationship,product_has_category,product_sub_category,product_category,factory, facility
// goods,service,product,product_feature,work_center,quote,quote_item,order,order_item,sales_order,purchase_order,monitoring_bsi_cutting,monitoring_bsi_sewing,monitoring_bsi_supermarket,monitoring_bsi_qc,bom,operation,bom_component,bom_service,approval,shipment,shipment_item,invoice,invoice_item,invoice_receipt,invoice_receipt_items,invoice_status,invoice_term,payment,payment_budget_alloc,financial_account,financial_account_transaction,bom_status,budget_status,completion_status,invoice_status,manufacture_status,order_completion_status,order_status,quote_status,request_status,shipment_status,status,budget_has_budget_revision,budget_has_budget_status_type,factory_has_facility,invoice_has_invoice_type,invoice_has_shipment,manufacture_has_bom,model_has_permissions,model_has_roles,order_item_has_goods,order_item_has_product,party_has_contact_mechanism,payment_has_invoice,product_has_category,purchase_invoice,purchase_order,request_has_party,requirement_has_request,requirement_has_request_item,role_has_permissionsHide,facility_target