<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controller\Order;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Order
Route::resource('sales-order', 'SalesOrderController')->only(['index']);
Route::resource('purchase-order', 'PurchaseOrderController')->only(['index']);
Route::resource('order', 'OrderController')->only(['index']);
Route::resource('order-item', 'OrderItemController')->only(['index']);
Route::resource('order-status', 'OrderStatusController')->only(['index']);
Route::resource('order-role', 'OrderRoleController')->only(['index']);
Route::resource('order-associaiton', 'OrderAssociationController')->only(['index']);

//Product
Route::resource('product', 'ProductController')->only(['index']);
Route::resource('service', 'ServiceController')->only(['index']);
Route::resource('goods', 'GoodsController')->only(['index']);
Route::resource('inventory', 'InventoryController')->only(['index']);
Route::resource('inventory-type', 'InventoryTypeController')->only(['index']);
Route::resource('part', 'PartController')->only(['index']);
Route::resource('partBOM', 'PartBOMController')->only(['index']);
Route::resource('product', 'ProductController')->only(['index']);
Route::resource('productCategory', 'ProductCategoryController')->only(['index']);
Route::resource('productFeature', 'ProductFeatureController')->only(['index']);

//Party
Route::resource('address', 'AddressController')->only(['index']);
Route::resource('organization', 'OrganizationController')->only(['index']);
Route::resource('party', 'PartyController')->only(['index']);
Route::resource('party-roles', 'PartyRolesController')->only(['index']);
Route::resource('person', 'PersonControllerController')->only(['index']);
Route::resource('relationship', 'RelationshipController')->only(['index']);
Route::resource('status', 'StatusController')->only(['index']);

//Request, Requirement and Quote
Route::resource('quote', 'QuoteController')->only(['index']);
Route::resource('quote-item', 'QuoteItemController')->only(['index']);
Route::resource('quote-role', 'QuoteRoleController')->only(['index']);
Route::resource('request', 'RequestController')->only(['index']);
Route::resource('request-item', 'RequestItemController')->only(['index']);
Route::resource('requirement', 'RequirementController')->only(['index']);
Route::resource('requirement-has-request', 'RequirementHasRequestController')->only(['index']);
Route::resource('requirement-has-request-item', 'RequirementHasRequestItemController')->only(['index']);

//Agreement
Route::resource('agreement', 'AgreementController')->only(['index']);
Route::resource('agreement-role', 'AgreementRoleController')->only(['index']);
Route::resource('agreement-item', 'AgreementItemController')->only(['index']);
Route::resource('price-component', 'PriceComponentController')->only(['index']);

//Shipment
Route::resource('item-issuance', 'ItemIssuanceController')->only(['index']);
Route::resource('order-shipment', 'OrderShipmentController')->only(['index']);
Route::resource('shipment', 'ShipmentController')->only(['index']);
Route::resource('shipment-item', 'ShipmentItemController')->only(['index']);
Route::resource('shipment-receipt', 'ShipmentReceiptController')->only(['index']);
Route::resource('shipment-role', 'ShipmentRoleController')->only(['index']);