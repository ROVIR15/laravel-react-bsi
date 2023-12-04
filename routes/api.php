<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Route
|--------------------------------------------------------------------------
|
| Here is where you can register API Route for your application. These
| Route are loaded by the RouteerviceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');
Route::put('reset-password/{id}', 'AuthController@reset');
Route::resource('user', 'UsersController')->only(['index', 'show']);

Route::group(['middleware' => ['auth:api', 'record.api.transactions', 'notification.logger']], function () {
    Route::post('logout', 'AuthController@logout');

    Route::resource('upload', 'UploadController')->only(['store']);

    // Costing
    Route::get('costing-list', 'ManufacturePlanningItemsController@getCosting');
    Route::get('costing-list/{id}', 'ManufacturePlanningItemsController@getACosting');

    //Party
    Route::resource('vendor', 'VendorController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('labor', 'LaborController')->only(['index', 'store', 'show', 'update', 'destroy']);

    //Inquiry
    Route::resource('inquiry', 'InquiryController')->only(['index', 'show', 'store', 'update', 'destroy']);

    //Order
    Route::resource('sales-order', 'SalesOrderController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::post('upload-sales-order', 'UploadController@upload_sales_order');
    Route::resource('order-item', 'OrderItemController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::resource('order-role', 'OrderRoleController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::resource('order-association', 'OrderAssociationController')->only(['index', 'store', 'update', 'destroy']);
    Route::resource('order-completion-status', 'OrderCompletionStatusController')->only(['index', 'store', 'update', 'destroy']);
    Route::resource('po-buyer-proof', 'POBuyerProofController')->only(['update']);
    //Product
    Route::resource('product', 'ProductController')->only(['index']);
    Route::resource('service', 'ServiceController')->only(['index']);
    Route::resource('goods', 'GoodsController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::get('goods-v2', 'V2\GoodsController@index');
    Route::resource('service', 'ServiceController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::resource('part', 'PartController')->only(['index']);
    Route::resource('partBOM', 'PartBOMController')->only(['index']);
    Route::resource('product', 'ProductController')->only(['index']);
    Route::resource('product-category', 'ProductCategoryController')->only(['index']);
    Route::resource('product-feature', 'ProductFeatureController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::get('finished-goods', 'GoodsController@showFG');
    Route::resource('goods-option', 'GoodsOptionController')->only(['index']);

    //BOM
    Route::resource('bom', 'BOMController')->only(['index', 'store', 'show', 'update']);
    Route::resource('bom-document', 'BOMDocumentController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('bom-item', 'BOMItemController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('bom-service', 'BOMServiceController')->only(['index', 'show', 'update', 'store']);
    Route::resource('bom-status', 'BOMStatusController')->only(['index', 'store', 'update', 'destroy', 'show']);

    Route::resource('costing', 'BOMController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('costing-document', 'BOMDocumentController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('costing-item', 'BOMItemController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('costing-service', 'BOMServiceController')->only(['index', 'show', 'update', 'store']);
    Route::resource('costing-status', 'BOMStatusController')->only(['index', 'store', 'update', 'destroy', 'show']);

    //BOM alt
    Route::resource('bom-alt-v2', 'BOM_AltController')->only(['index', 'store', 'show', 'destroy']);
    Route::resource('bom-item-alt-v2', 'BOMItem_AltController')->only(['store', 'update', 'destroy']);
    Route::get('bom-items-list-v2/{bom_id}', 'BOM_AltController@getBOMItem_alt');

    // Manufacture
    Route::resource('manufacture', 'ManufactureController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('manufacture-operation', 'ManufactureOperationController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('manufacture-component', 'ManufactureComponentController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('operation-result', 'MOperationResultController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('production-record', 'ProductionRecorderController')->only(['store']);
    Route::resource('manufacture-planning', 'ManufacturePlanningController')->only(['store', 'index', 'show', 'destroy']);
    Route::resource('manufacture-planning-item', 'ManufacturePlanningItemsController')->only(['update', 'destroy', 'store']);

    //Operation
    Route::resource('operation', 'OperationController')->only(['index', 'store', 'show', 'update', 'destroy']);

    //WorkCenter & Operation
    Route::resource('work-center', 'WorkCenterController')->only(['index', 'store', 'show', 'update', 'destroy']);

    //Party
    Route::resource('address', 'AddressController')->only(['index']);
    Route::resource('organization', 'OrganizationController')->only(['index']);
    Route::resource('party', 'PartyController')->only(['index']);
    Route::resource('party-roles', 'PartyRolesController')->only(['index']);
    Route::resource('person', 'PersonControllerController')->only(['index']);
    Route::resource('relationship', 'RelationshipController')->only(['index']);
    Route::resource('status', 'StatusController')->only(['index']);

    //Request, Requirement and Quote
    Route::resource('quote', 'QuoteController')->only(['index', 'show', 'update', 'destroy', 'store']);
    Route::resource('quote-item', 'QuoteItemController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::resource('quote-role', 'QuoteRoleController')->only(['index']);
    Route::resource('quote-status', 'QuoteStatusController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::resource('request', 'RequestController')->only(['index']);
    Route::resource('request-item', 'RequestItemController')->only(['index', 'update', 'show', 'destroy', 'store']);
    Route::resource('request-status', 'RequestStatusController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::resource('requirement', 'RequirementController')->only(['index']);
    Route::resource('requirement-has-request', 'RequirementHasRequestController')->only(['index']);
    Route::resource('requirement-has-request-item', 'RequirementHasRequestItemController')->only(['index']);

    //Agreement
    Route::resource('po-agreement', 'POApprovalController')->only(['index', 'show', 'update']);
    Route::resource('bom-agreement', 'BOMApprovalController')->only(['index', 'show', 'update']);
    Route::resource('agreement', 'AgreementController')->only(['index', 'store']);
    Route::resource('agreement-role', 'AgreementRoleController')->only(['update']);
    Route::resource('agreement-item', 'AgreementItemController')->only(['index']);
    Route::resource('price-component', 'PriceComponentController')->only(['index']);

    //Shipment
    Route::resource('shipment', 'ShipmentController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('shipment-subcontract', 'ShipmentController@shipmentListSubcontract');
    Route::resource('item-issuance', 'ItemIssuanceController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::post('item-issuance-v2', 'ItemIssuanceController@storeV2');
    Route::resource('shipment-status', 'ShipmentStatusController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('shipment-item', 'ShipmentItemController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('shipment-receipt', 'ShipmentReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('shipment-role', 'ShipmentRoleController')->only(['index']);
    Route::get('shipment-invoicing', 'ShipmentController@shipmentInvoicing');
    Route::post('post-incoming-goods', 'ShipmentController@postIncomingGoods')->name('shipment');

    //Inventory
    Route::resource('goods-receipt', 'GoodsReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('goods-receipt-item', 'GRItemsController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('inventory', 'InventoryController')->only(['index', 'store']);
    Route::resource('inventory-type', 'InventoryTypeController')->only(['index']);
    Route::post('scrap-insert', 'InventoryController@scrap_insert');
    Route::resource('item-issuance', 'ItemIssuanceController')->only(['store']);
    Route::post('material-transfer-realisation', 'MaterialTransferController@confirmation_material_tranfer')->name('material-transfer-realisation');
    Route::post('post-material-transfer-status', 'MaterialTransferController@new_material_transfer_update_status');

    Route::resource('adjustment-item', 'AdjustmentItemController')->only(['store', 'update', 'destroy']);
    Route::resource('adjustment', 'AdjustmentController')->only(['index', 'store', 'update', 'show', 'update', 'destroy']);

    //Finance
    Route::resource('financial-account', 'FinancialAccountController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::get('finance-account-type', 'FinancialAccountController@getFinanceAccountType');
    Route::resource('payment', 'PaymentController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::post('insert-payment', 'PaymentController@insertManyPayment');
    Route::get('payment-method-type', 'PaymentController@getPaymentMethodType');
    Route::get('payment-collection', 'PaymentController@getPaymentGroupByRefNum');
    Route::resource('financial-transaction', 'FinancialAccountTransactionController')->only(['index', 'show', 'update', 'destroy']);
    Route::post('financial-transactions', 'FinancialAccountTransactionController@insertFATx');

    //Accounting
    Route::resource('invoice', 'InvoiceController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('invoice-status', 'InvoiceStatusController')->only(['store']);
    Route::get('invoice-payment', 'InvoiceController@paymentInvoice');
    Route::get('invoice-report', 'InvoiceController@generateReport');
    Route::get('invoice-party', 'InvoiceController@getInvoicedParty');
    Route::resource('invoice-receipt', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('invoice-receipt-item', 'IRItemsController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::post('post-vendor-bills', 'InvoiceController@postVendorBills');

    //Purchasing
    Route::resource('request-for-quotation', 'RFQController')->only('index', 'store', 'destroy', 'update', 'show');

    //Study
    Route::resource('observation-result', 'ObservationResultController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('process-study', 'ProcessStudyController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('process', 'ProcessController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('production-study', 'ProductionStudyController')->only(['index', 'show', 'store', 'update', 'destroy']);

    //Invoice
    Route::resource('billing-account', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('billing-account-role', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('financial-account-role', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('financial-transaction', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('invoice-role', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('invoice-term', 'InvoiceTermController')->only(['store', 'update']);
    Route::get('invoice-term-invoice/{id}', 'InvoiceTermController@getInvoiceTermOfInvoice');
    // Route::resource('payment', 'IRItemsController')->only(['index', 'show', 'store', 'update', 'destroy']);
    // Route::resource('payment-application', 'IRItemsController')->only(['index', 'show', 'store', 'update', 'destroy']);

    // Route::resource('sales-invoice', 'SalesInvoiceController')->only(['index', 'show', 'store', 'update', 'destroy']);
    // Route::resource('purchase-invoice', 'PurchaseInvoiceController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('invoice', 'InvoiceController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('invoice-item', 'InvoiceItemController')->only(['index', 'show', 'store', 'update', 'destroy']);

    // Facilitiy
    Route::resource('facility-target', 'FacilityTargetController')->only('index', 'store', 'update', 'show');
    Route::resource('facility', 'FacilityController')->only(['index', 'show', 'store']);
    Route::resource('factory', 'FactoryController')->only(['index', 'show', 'store']);
    Route::get('facility-type', 'FacilityController@getFacilityType');
    Route::post('factory-has-facility', 'FactoryController@insertNewFacilityToFactory');

    // Action on Manufacturing Order
    Route::resource('action', 'ActionController')->only(['index', 'show', 'store']);

    // Consume
    Route::resource('consume', 'ConsumeInventoryController')->only(['store', 'show']);

    // sampling study
    Route::resource('sample-study', 'SamplingStudyController')->only(['store', 'show', 'index', 'update', 'destroy']);
    Route::resource('sample-process', 'SampleProcessStudyController')->only(['store', 'update', 'destroy']);

    //Monitoring
    Route::resource('monitoring-supermarket', 'MonitoringSupermarketController')->only(['store', 'index', 'show']);
    Route::resource('monitoring-numbering', 'MonitoringNumberingController')->only(['store', 'index', 'show']);
    Route::resource('monitoring-cutting', 'MonitoringCuttingController')->only(['store', 'index', 'show']);
    Route::get('cutting-supermarket', 'MonitoringCuttingController@getCuttingSupermarket');
    Route::resource('monitoring-spreading', 'MonitoringSpreadingController')->only(['store', 'index', 'show']);
    Route::resource('monitoring-sewing', 'MonitoringSewingController')->only(['store', 'index', 'show']);
    Route::resource('monitoring-qc', 'MonitoringQcController')->only(['store', 'index', 'show']);
    Route::resource('monitoring-fg', 'MonitoringFinishedGoodsController')->only(['store', 'index', 'show']);
    Route::resource('role', 'RoleTypeController')->only(['index']);

    Route::resource('machine', 'MachineController')->only(['index', 'store', 'update', 'destroy', 'show']);

    Route::resource('purchase-requisition', 'PurchaseRequisitionController')->only('index', 'store', 'destroy', 'update', 'show');
    Route::resource('pages', 'PagesController')->only('index', 'store', 'destroy', 'update', 'show');
    Route::resource('pages-access', 'PagesAccessController')->only('index', 'store', 'destroy', 'update', 'show');
    Route::resource('submission', 'ApprovalController')->only('index', 'store', 'destroy', 'update', 'show', 'showByUserId');

    //Agre

    Route::get('sewing-line-detail', 'GraphSewingController@sewingLineDetail');
    Route::get('fabric', 'ProductFeatureController@showFabric');
    Route::resource('order-status', 'OrderStatusController')->only(['index', 'store', 'update', 'destroy', 'show']);
    Route::resource('order', 'OrderController')->only(['index', 'show', 'update']);
    Route::resource('purchase-order', 'PurchaseOrderController')->only(['index', 'show', 'store', 'update', 'destroy']);

    // Graph
    Route::resource('graph-api', 'GraphSewingController')->only(['index']);
    Route::get('new-api-test', 'GraphSewingController@testingAPI1');
    Route::get('new-api-test-2', 'GraphSewingController@testingAPI2');
    Route::get('new-api-test-3/{id}', 'GraphSewingController@testingAPI3');
    Route::get('sewing-monetary', 'GraphSewingController@getAmountOfMoney');
    Route::resource('invoice-submission', 'InvoiceSubmissionController')->only(['index', 'store', 'update', 'destroy', 'show']);


    Route::get('costing-listv1', 'BOMController@bomList');
    Route::get('purchase-order-list', 'PurchaseOrderController@getPurchaseOrderList');
    Route::get('sales-order-list', 'SalesOrderController@getSalesOrderList');

    Route::get('reconcile-v1', 'ReconcileController@getAllOrderItem');

    Route::get('order-item-xx/{id}', 'SalesOrderController@createPDF');
    Route::get('bom-items-v1', 'BOMController@getBOMMaterials');
    Route::resource('production-log', 'ProductionLogController')->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::post('upload-shipment-receipt', 'UploadController@upload_shipment_receipt');
    Route::post('upload-payment-receipt', 'UploadController@upload_payment_receipt');



    Route::resource('reconcile', 'ReconcileController')->only(['index', 'store', 'show']);

    Route::post('reconcile-post-po', 'ReconcileController@insertReconcilePurchaseOrder');
    Route::post('reconcile-post-so', 'ReconcileController@insertReconcileSalesOrder');
    Route::post('reconcile-post-costing', 'ReconcileController@insertReconcileCosting');

    Route::resource('buyer', 'BuyerController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::put('update-postal-address/{id}', 'ContactMechanismController@update_postal_address');
    Route::put('update-email/{id}', 'ContactMechanismController@update_email');
    Route::put('update-telecommunication-number/{id}', 'ContactMechanismController@update_telecommunication_number');
    Route::resource('contact-mechanism', 'ContactMechanismController')->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::put('update-new-feature-v2/{id}', 'ContactMechanismController@update_flag_contact_mechanism');
    Route::get('purchase-order-v2', 'PurchaseOrderController@getPurchaseOrderWhereNotInvoicedYet');
    Route::post('vendor-bills', 'InvoiceController@storeVendorBills');

    Route::get('capacity-sewing', 'MonitoringSewingController@indexV2');
    Route::get('finished-garment-valuation', 'MonitoringFinishedGoodsController@getReadyMadeGarmentValuation');
    Route::get('running-buyer-order', 'MonitoringSewingController@indexV3');
    Route::get('uninvoiced-purchase-order', 'PurchaseOrderController@getUninvoicedPurchaseOrder');
    Route::post('store-vendor-bills', 'InvoiceController@storeVendorBills');
    Route::get('invoice-payment', 'InvoiceController@paymentInvoice');

    Route::resource('material-transfer', 'MaterialTransferController')->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::post('material-transfer-direct', 'MaterialTransferController@submit_and_confirmation');
    Route::get('material-status-with-stock', 'ProductFeatureController@checkInventoryItemWithStock');

    Route::resource('adjustment', 'AdjustmentController')->only(['index', 'store', 'update', 'show', 'update', 'destroy']);

    // Route::resource('currency-exchange', 'CurrencyController')->only(['index', 'store']);

    Route::get('incoming-material-report', 'InventoryController@regIncomingMaterial');
    Route::get('outbound-material-report', 'InventoryController@regOutboundMaterial');
    Route::get('wip-material-report', 'InventoryController@repWIPSubcontract');
    Route::get('raw-material-report', 'InventoryController@repRawMaterialMovement');
    Route::get('fg-material-report', 'InventoryController@repFGoods');
    Route::get('mutasi-report', 'InventoryController@repMutasiV2');
    Route::get('report-scrap', 'ScrapController@reportScrap');
    Route::get('current-stock', 'InventoryController@InventoryStock');

    // jangan lupa dihapus
    Route::resource('facility', 'FacilityController')->only(['index', 'show', 'store']);
    Route::get('stock-scrap', 'InventoryController@get_scrap');

    Route::get('bom-item-alt-v3/{costing_id}', 'BOMItemController@findItemsByCostingId');
    Route::get('bom-item-alt-v6/{costing_id}', 'BOMItemController@findItemsByCostingId_test');
    Route::get('final-goods', 'ProductFeatureController@justFinishedGoods');
    Route::get('bom-item-alt-v4/{costing_id}', 'BOMItemController@findItemsByCostingIdWithStock');
    Route::get('bom-item-alt-v5/{costing_id}', 'BOMItemController@findItemsByCostingIdWithStock_test');
    Route::get('get-costing', 'BOMItemController@getCostingId');
    Route::get('sales-order-v2', 'SalesOrderController@get_sales_order');
    Route::get('purchase-order-v2', 'PurchaseOrderController@get_purchse_order');
    Route::get('sales-order-item-v2/{order_id}', 'SalesOrderController@get_sales_order_items');
    Route::resource('scrap', 'ScrapController')->only(['index', 'store', 'show', 'update', 'destroy']);

    Route::get('report-osr-ppic', 'OSRController@get_osr_ppic_report');
    Route::resource('material-transfer', 'MaterialTransferController')->only(['index', 'store', 'show', 'update', 'destroy']);
    
    // kite import 
    Route::resource('kite-export', 'KITEExportController')->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::resource('kite-import', 'KITEImportController')->only(['index', 'store', 'update', 'show', 'destroy']);
    Route::get('get-import-po', 'PurchaseOrderController@get_import_po');
    Route::put('kite-import-item/{id}', 'KITEImportController@update_item');
    Route::get('get-export-so', 'SalesOrderController@get_export_so');
    Route::get('get-sales-order-item/{order_id}', 'OrderItemController@getFinishedGoodsOrderItemWithStock');
    
    Route::get('notification/{user_id}', 'NotificationController@showFew');
    Route::put('notification/{notif_id}', 'NotificationController@update');
    Route::put('notification-mark-all/{user_id}', 'NotificationController@markAllAsRead');
});

// Route::resource('currency-exchange', 'CurrencyController')->only(['index', 'store']);
Route::get('report-osr-ver-helmi', 'OSRController@get_osr_ver_helmi');
Route::get('report-shipment', 'OSRController@get_shipment_report');
Route::resource('logs', 'LogController')->only(['index']);

// Route::resource('bom', 'BOMController')->only(['index', 'store', 'show', 'update']);
// Route::resource('shipment', 'ShipmentController')->only(['index', 'show', 'store', 'update', 'destroy']);
// Route::get('bom-detail-report/{id}', 'BOMItemController@findItemOrderItemCostingId');
Route::get('notification/{user_id}', 'NotificationController@showFew');
Route::resource('currency-exchange', 'CurrencyController')->only(['index', 'store']);

Route::resource('goods', 'V2\GoodsController')->only(['index', 'store', 'update', 'destroy', 'show']);

Route::get('shipment-subcontract', 'ShipmentController@shipmentListSubcontract');
Route::get('wip-material-report', 'InventoryController@repWIPSubcontract');
Route::post('item-issuance-v2', 'ItemIssuanceController@storeV2');

Route::get('bom-item-alt-v5/{costing_id}', 'BOMItemController@findItemsByCostingIdWithStock_test');
Route::get('bom-item-alt-v6/{costing_id}', 'BOMItemController@findItemsByCostingId_test');


Route::group(['middleware' => ['auth.api.finance.external']], function () {
    Route::get('v2/finance/purchase-order', 'V2\Finance\PurchaseOrderController@index');
    Route::get('v2/finance/purchase-order-items/{id}', 'V2\Finance\PurchaseOrderController@items');
    Route::get('v2/finance/invoice', 'V2\Finance\InvoiceController@index');
    Route::get('v2/finance/invoice-items/{id}', 'V2\Finance\InvoiceController@items');
    Route::get('v2/finance/material-transfer', 'V2\Finance\MaterialTransferController@index');
    Route::get('v2/finance/material-transfer-items/{id}', 'V2\Finance\MaterialTransferController@items');
    Route::get('v2/finance/material-transfer-facility', 'V2\Finance\MaterialTransferController@material_transfer_facility');
});


Route::get('v2/monitoring/daily-production-status', 'V2\Monitoring\ProductionStatusController@index');
Route::get('v2/monitoring/daily-production-status-2', 'V2\Monitoring\ProductionStatusController@getDataBasedOnStyleFilterByDay');