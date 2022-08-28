<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  

  use App\Models\Inventory\InvoiceReceiptItems;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Inventory\InvoiceReceiptItemsCollection;
  use App\Http\Resources\Inventory\InvoiceReceiptItems as oneInvoiceReceiptItems;
  use Illuminate\Http\Request;
  
  class IRItemsController extends Controller
  {  
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $param = $request->all();
        $query = InvoiceReceiptItems::all();

        return new InvoiceReceiptItemsCollection($query);
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
      $param = $request->all()['payload'];

      try {
        //Create purchase order item
        $IRItems = [];

        foreach($param as $key){
          array_push($IRItems, [
            'invoice_receipt_id' => $key['invoice_receipt_id'],
            'order_item_id' => $key['order_item_id'],
            'amount' => $key['amount'],
            'qty' => $key['qty']
          ]);
        }

        InvoiceReceiptItems::insert($IRItems);

      } catch (Exception $e) {
        //throw $th;
        return response()->json(
          [
            'success' => false,
            'errors' => $e->getMessage()
          ],
          500
        );
      }
      
      return response()->json([
        'success' => true
      ], 200);
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
        $InvoiceReceiptData = InvoiceReceiptItems::find($id);
        return new oneInvoiceReceiptItems($InvoiceReceiptData);
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
      $GoodsReceiptData = $request->all()['payload'];
      try {
        InvoiceReceiptItems::find($id)->update($GoodsReceiptData);
      } catch (Exception $th) {
          //throw $th;
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
        $InvoiceReceipt = InvoiceReceiptItems::destroy($id);

      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }

      return response()->json([
        'success' => true,
      ], 200);

    }
  }
