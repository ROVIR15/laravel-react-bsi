<?php

namespace App\Http\Controllers\V2\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order\PurchaseOrder;
use App\Models\Shipment\Shipment;

class PurchaseOrderController extends Controller
{
    //

    public function showPurchaseOrderWhichShipment(Request $request)
    {

        try {

            $query_sh = Shipment::select('order_id')->groupBy('order_id')->get()->map(function ($query) {
                return $query->order_id;
            });

            $query = PurchaseOrder::with('party')
                ->whereNotIn('order_id', $query_sh)
                // ->whereDoesntHave('shipment', function ($query) {
                //     return $query->whereHas('status', function ($query) {
                //         return $query->whereNotIn('shipment_type_status_id', [2, 4, 5]);
                //     });
                // })
                ->wherehas('status', function ($query) {
                    return $query->where('status_type', 'Review');
                })
                ->orderBy('id', 'desc')
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
