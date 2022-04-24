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

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('logout', 'AuthController@logout');
});

//Party
Route::resource('buyer', 'BuyerController')->only(['index', 'store', 'show', 'update', 'destroy']);
Route::resource('vendor', 'VendorController')->only(['index', 'store', 'show', 'update', 'destroy']);

//Inquiry
Route::resource('inquiry', 'InquiryController')->only(['index', 'show', 'store', 'update', 'destroy']);

//Order
Route::resource('sales-order', 'SalesOrderController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('order', 'OrderController')->only(['index']);
Route::resource('order-item', 'OrderItemController')->only(['index', 'store', 'update', 'destroy', 'show']);
Route::resource('order-status', 'OrderStatusController')->only(['index', 'store', 'update', 'destroy', 'show']);
Route::resource('order-role', 'OrderRoleController')->only(['index', 'store', 'update', 'destroy', 'show']);
Route::resource('order-association', 'OrderAssociationController')->only(['index', 'store', 'update', 'destroy']);

//Product
Route::resource('product', 'ProductController')->only(['index']);
Route::resource('service', 'ServiceController')->only(['index']);
Route::resource('goods', 'GoodsController')->only(['index', 'store', 'update', 'destroy', 'show']);
Route::resource('part', 'PartController')->only(['index']);
Route::resource('partBOM', 'PartBOMController')->only(['index']);
Route::resource('product', 'ProductController')->only(['index']);
Route::resource('product-category', 'ProductCategoryController')->only(['index']);
Route::resource('product-feature', 'ProductFeatureController')->only(['index', 'store', 'update', 'destroy', 'show']);

//BOM
Route::resource('bom', 'BOMController')->only(['index', 'store', 'show', 'update', 'destroy']);
Route::resource('bom-document', 'BOMDocumentController')->only(['index', 'store', 'show', 'update', 'destroy']);
Route::resource('bom-item', 'BOMItemController')->only(['index', 'show', 'store', 'update', 'destroy']);

//Operation
Route::resource('operation', 'BOMController')->only(['index', 'store', 'show', 'update', 'destroy']);

//WorkCenter & Operation
Route::resource('work-center', 'WorkCenterController')->only(['index', 'store', 'show', 'update', 'destroy']);
Route::resource('operation', 'OperationController')->only(['index', 'store', 'show', 'update', 'destroy']);

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
Route::resource('request', 'RequestController')->only(['index']);
Route::resource('request-item', 'RequestItemController')->only(['index', 'update', 'show', 'destroy', 'store']);
Route::resource('requirement', 'RequirementController')->only(['index']);
Route::resource('requirement-has-request', 'RequirementHasRequestController')->only(['index']);
Route::resource('requirement-has-request-item', 'RequirementHasRequestItemController')->only(['index']);

//Agreement
Route::resource('agreement', 'AgreementController')->only(['index']);
Route::resource('agreement-role', 'AgreementRoleController')->only(['index']);
Route::resource('agreement-item', 'AgreementItemController')->only(['index']);
Route::resource('price-component', 'PriceComponentController')->only(['index']);

//Shipment
Route::resource('item-issuance', 'ItemIssuanceController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('shipment', 'ShipmentController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('shipment-item', 'ShipmentItemController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('shipment-receipt', 'ShipmentReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('shipment-role', 'ShipmentRoleController')->only(['index']);

//Inventory
Route::resource('goods-receipt', 'GoodsReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('goods-receipt-item', 'GRItemsController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('invoice-receipt', 'InvoiceReceiptController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('invoice-receipt-item', 'IRItemsController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('inventory', 'InventoryController')->only(['index']);
Route::resource('inventory-type', 'InventoryTypeController')->only(['index']);

//Purchasing
Route::resource('purchase-order', 'PurchaseOrderController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('purchase-requisition', 'PurchaseRequisitionController')->only('index', 'store', 'destroy', 'update', 'show');
Route::resource('request-for-quotation', 'RFQController')->only('index', 'store', 'destroy', 'update', 'show');

//Study
Route::resource('observation-result', 'ObservationResultController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('process-study', 'ProcessStudyController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('process', 'ProcessController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::resource('production-study', 'ProductionStudyController')->only(['index', 'show', 'store', 'update', 'destroy']);
