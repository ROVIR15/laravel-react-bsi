<?php

namespace App\Http\Controllers\V2\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order\PurchaseOrder;

class PurchaseOrderController extends Controller
{
    //

    public function showPurchaseOrderWhichShipment(Request $request)
    {

        try {
            $query = PurchaseOrder::with('party')->whereHas('shipment', function ($query) {
                return $query->whereHas('status', function ($query) {
                    return $query->whereNotIn('shipment_type_status_id', [2, 4, 5]);
                });
            })
                ->wherehas('status', function ($query) {
                    return $query->where('status_type', 'Review');
                })
                ->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }
}
