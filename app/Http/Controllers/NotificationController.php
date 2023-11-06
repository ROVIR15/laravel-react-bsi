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
    public function showFew($userId, Request $request)
    {
        $limit = $request->query('limit') ? $request->query('limit') : 10;

        try {
            //code...
            $query_notification  = Notification::where('user_id', $userId)->where('is_read', true)->orderBy('id', 'desc')->count();
            $totalUnread = $query_notification;
            $query = Notification::where('user_id', $userId)->orderBy('id', 'desc')->paginate($limit);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error message'
            ], 500);
        }

        return response()->json([
            'data' => $query, 'total_unread' => $totalUnread
        ], 200);
    }

    public function update($notifId, Request $request)
    {
        $param = $request->all()['payload'];
        try {
            Notification::find($notifId)->update([ 'is_read' => true ]);
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
