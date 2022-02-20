<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controller\Order;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('sales-order', 'SalesOrderController')->only(['index']);
Route::resource('purchase-order', 'PurchaseOrderController')->only(['index']);
Route::resource('order', 'OrderController')->only(['index']);
Route::resource('order-item', 'OrderItemController')->only(['index']);
Route::resource('order-status', 'OrderStatusController')->only(['index']);
Route::resource('order-role', 'OrderRoleController')->only(['index']);
Route::resource('order-associaiton', 'OrderAssociationController')->only(['index']);
