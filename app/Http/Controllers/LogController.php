<?php

namespace App\Http\Controllers;

use App\LogTable;
use Carbon\Carbon;
use Illuminate\Http\Request;

use DB;

class LogController extends Controller
{
    //
    public function index(Request $request)
    {
        try {

            $startDate = Carbon::today();
            $endDate = Carbon::today()->addDays(7);

            $query = LogTable::with('user')
                ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($item, $index) {
                    return [
                        'id' => $index + 1,
                        'level' => $item->level,
                        'url' => $item->url,
                        'method' => $item->method,
                        'message' => $item->message,
                        'context' => $item->context,
                        'user_id' => $item->user_id,
                        'user_name' => $item->user->name,
                        'created' => $item->created_at
                    ];
                });
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
        // return ('users.index',compact('data'))
        //    ->with('i', ($request->input('page', 1) - 1) * 5);
    }
}
