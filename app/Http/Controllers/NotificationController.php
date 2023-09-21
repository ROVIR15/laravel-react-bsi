<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notification;
use Exception;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showFew($userId)
    {

        try {
            //code...
            $query = Notification::where('user_id', $userId)->orderBy('id', 'desc')->limit(10)->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error message'
            ], 500);
        }

        return response()->json([
            'data' => $query
        ], 200);
    }

    public function update($notifId, Request $request)
    {
        $param = $request->all()['payload'];
        try {
            Notification::find($notifId)->update($param);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }

    public function markAllAsRead($userId)
    {
        try {
            Notification::where('user_id', $userId)->update([ 'is_read' => true ]);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }
}
