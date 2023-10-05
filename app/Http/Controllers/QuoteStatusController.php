<?php

namespace App\Http\Controllers;


use App\Models\RRQ\QuoteStatus;
use App\Http\Controllers\Controller;
use App\Models\RRQ\Quote;
use Illuminate\Http\Request;

class QuoteStatusController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $query = QuoteStatus::all();

    return response()->json($query);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $QuoteStatusData = $request->all()['payload'];

    try {

      $query = Quote::find($QuoteStatusData['quote_id']);

      QuoteStatus::create([
        'user_id' => $QuoteStatusData['user_id'],
        'quote_id' => $QuoteStatusData['quote_id'],
        'status_type' => $QuoteStatusData['status_type'],
        'description' => $QuoteStatusData['description']
      ]);
    } catch (Exception $th) {
      return response()->json(['success' => false, 'errors' => $th->getMessage()], 500);
    }

    if ($query['quote_type'] === 'PO') {
      return response()->json([
        'success' => true,
        'title' => 'RF-Quotation Status Has Been Changed to' . $QuoteStatusData['status_type'],
        'message' => 'The #'. $QuoteStatusData['quote_id'] .'quotation has been changed status',
        'link' => '/purchasing/request-for-quotation/' . $QuoteStatusData['quote_id'],
      ], 200);
    } else if ($query['quote_type'] === 'SO') {
      return response()->json([
        'success' => true,
        'title' => 'Quotation Status Has Been Changed to' . $QuoteStatusData['status_type'],
        'message' => 'The #'. $QuoteStatusData['quote_id'] .'quotation has been changed status',
        'link' => '/order/quotation/' . $QuoteStatusData['quote_id'],
      ], 200);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    try {
      $query = QuoteStatus::find($id);
      return response()->json($query);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function edit(X $x)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function update($id, Request $request)
  {
    $QuoteStatusData = $request->all()['payload'];

    try {
      if (empty($id)) return response()->json(['success' => false, 'errors' => 'id not found']);
      QuoteStatus::find($id)->update($QuoteStatusData);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }

    return response()->json([
      'success' => true
    ], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    try {
      QuoteStatus::find($id)->delete();
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
    return response()->json([
      'success' => true
    ], 200);
  }
}
