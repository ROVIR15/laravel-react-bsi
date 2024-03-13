<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentItem extends Model
{
    protected $table = 'shipment_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'shipment_id',
        'order_item_id',
        'shipment_type_id',
        'qty',
        'qty_shipped',
        'description'
    ];

    public function order_item(){
      return $this->belongsTo('App\Models\Order\OrderItem', 'order_item_id')
      ->with('costing_item')
      ->with(['product_feature' => function($query){
        return $query->with('product_category', 'product');
      }]);
    }

    public function alt_order_item(){
      return $this->belongsTo('App\Models\Order\OrderItem', 'order_item_id')->with('costing');
    }

    public function shipment(){
      return $this->belongsTo('App\Models\Shipment\Shipment', 'shipment_id');
    }

    public function import_info(){
      return $this->belongsTo('App\Models\KITE\ImportDocItem', 'order_item_id', 'order_item_id')->with('doc');
    }

    public function export_info(){
      return $this->belongsTo('App\Models\KITE\ExportDocItem', 'order_item_id', 'order_item_id')->with('doc');
    }
}
