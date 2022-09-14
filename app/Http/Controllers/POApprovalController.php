<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Agreement\Agreement;
use App\Models\Agreement\AgreementItem;
use App\Models\Agreement\AgreementRole;

class POApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Agreement $agreement)
    {
      $param = $request->all();
      $query = $agreement->where('agreement_type_id', 2)->get();

      return response()->json(['data' => $query]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Agreement $agreement, AgreementItem $agreementItem, AgreementRole $agreementRole)
    {
        try {

            $param = $request->all()['payload'];
            $current_date_time = Carbon::now()->toDateTimeString();
    
            $newPOAgreement = [
                'type_id' => $param['purchase_order_id'],
                'agreement_type_id' => 2
            ];

            $newAgreementRole = [
                'agreement_id' => $_aggrement->id,
                'party_id' => $param['party_id'],
                'status' => 'Created'
            ];
            
            $_aggrement = $agreement->create($newPOAgreement);
            $_agreementRole = $agreementRole->create($newAgreementRole);

            $newPOAgreementItem = [];
    
            foreach($param['items'] as $key){
                array_push($newPOAgreementItem, [
                    'agreement_id' => $_aggrement->id,
                    'product_feature_id' => $key['product_feature_id'],
                    'product_id' => $key['product_id'],
                    'qty' => $key['qty'],
                    'price' => $key['price']
                ]);
            }
    
            $_aggrementItem = $agreementItem->insert($newPOAgreementItem);

        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }
        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Party  $id -> party_id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      try {
        $data = Agreement::whereId($id)->with('agreement_item', 'organization', 'agreement_role')->get();

        if(!is_array($data) && count($data) === 0) {
            throw new Exception("Not found");
        }

        return response()->json([
          "success" => true,
          "data" => $data[0]
        ]);

      } catch (Exception $th) {
        return response()->json([
          "success" => false,
          "error" => $th->getMessage()
        ], 500);
      }
    }
}
