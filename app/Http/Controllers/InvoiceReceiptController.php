<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  

  use App\Models\Inventory\InvoiceReceiptItems;
  use App\Models\Inventory\InvoiceReceipt;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Inventory\InvoiceReceiptCollection;
  use App\Http\Resources\Inventory\InvoiceReceipt as oneInvoiceReceipt;
  use Illuminate\Http\Request;
  
  class InvoiceReceiptController extends Controller
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
        $query = InvoiceReceipt::all();

        return new InvoiceReceiptCollection($query);
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
        //Goods Receipt Creation
        $InvoiceReceipt = InvoiceReceipt::create([
            'purchase_order_id' => $param['purchase_order_id'],
            'amount' => $param['amount'],
            'qty' => $param['qty'],
            'invoice_date' => $param['invoice_date'],
            'posting_date' => $param['posting_date']
        ]);

        //Create purchase order item
        $IRItems = [];

        foreach($param['IRItems'] as $key){
          array_push($IRItems, [
            'invoice_receipt_id' => $InvoiceReceipt->id,
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
        $GoodsReceiptData = InvoiceReceipt::find($id);
        return new oneInvoiceReceipt($GoodsReceiptData);
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
        $InvoiceReceipt = InvoiceReceipt::find($id)->update($GoodsReceiptData);

        return response()->json([
          'success' => true
        ], 200);
      } catch (Exception $th) {
          //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
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
        $InvoiceReceipt = InvoiceReceipt::destroy($id);
        return response()->json([
          'success' => true,
        ], 200);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }
  }
