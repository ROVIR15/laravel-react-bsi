<?php

  namespace App\Models\Order;
  
  use Carbon\Carbon;
  use DB;

  use Illuminate\Database\Eloquent\Model;
  use App\Http\Resources\Party\Party;
  
  class SalesOrder extends Model
  {  
    protected $table = 'sales_order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'export_flag',
        'order_id',
        'sold_to',
        'ship_to',
        'po_number',
        'issue_date',
        'delivery_date',
        'valid_thru'
    ];

    public function order(){
      return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('status');
    }

    public function product_feature(){
      return $this->hasManyThrough('App\Models\Product\ProductFeature', 'App\Models\Order\OrderItem', 'order_id', 'id', 'order_id', 'product_feature_id')->with('product');
    }

    public function order_item(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('product_feature', 'check_shipment');
    }

    public function sum(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->groupBy('order_id')->select(DB::raw('sum(qty) as total_qty, sum(qty*unit_price) as total_money, avg(unit_price) as avg_unit_price, product_feature_id'))->with('product_feature');
    }
    
    public function avg_price(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->groupBy('order_id')->select(DB::raw('sum(qty) as total_qty, avg(unit_price) as cm_price_avg, sum(qty*cm_price) as total_money'));
    }

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'sold_to', 'id')->with('address');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id');
    }

    public function status(){
        return $this->hasManyThrough('App\Models\Order\OrderStatus', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->orderBy('created_at', 'desc');;
    }

    public function completion_status(){
        return $this->hasManyThrough('App\Models\Order\OrderCompletionStatus', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('status')->orderBy('created_at', 'desc');
    }

    public function monitoring_cutting(){
      return $this->hasMany('App\Models\Monitoring\Cutting', 'sales_order_id')->groupBy('sales_order_id')->select(DB::raw('id, order_id, sales_order_id, sum(output) as output'));
    }

    public function monitoring_sewing(){
      return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id')->groupBy('sales_order_id')->select(DB::raw('id, order_id, sales_order_id, sum(output) as output'));
    }

    public function sewing_output(){
      return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id');
    }

    public function sewing_output2(){
      return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id');
    }

    public function monitoring_qc(){
      return $this->hasMany('App\Models\Monitoring\Qc', 'sales_order_id')->groupBy('sales_order_id')->select(DB::raw('id, order_id, sales_order_id, sum(output) as output'));
    }

    public function monitoring_fg(){
      return $this->hasMany('App\Models\Monitoring\FinishedGoods', 'sales_order_id')->groupBy('sales_order_id')->select(DB::raw('id, order_id, sales_order_id, sum(output) as output'));
    }

    public function monitoring_sewing_detail(){
      return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id')->groupBy('po_number')->select(DB::raw('id, order_id, sales_order_id, po_number, sum(output) as output, product_feature_id'))->with('product_feature');
    }

    public function monitoring_qc_detail(){
      return $this->hasMany('App\Models\Monitoring\Qc', 'sales_order_id')->groupBy('po_number')->select(DB::raw('id, order_id, sales_order_id, po_number, sum(output) as output, product_feature_id'))->with('product_feature');
    }

    public function monitoring_fg_detail(){
      return $this->hasMany('App\Models\Monitoring\FinishedGoods', 'sales_order_id')->groupBy('po_number')->select(DB::raw('id, order_id, sales_order_id, po_number, sum(output) as output, product_feature_id'))->with('product_feature');
    }    

    public function invoice(){
      return $this->hasMany('App\Models\Invoice\Invoice', 'order_id', 'order_id')->with('sales_order', 'sum', 'terms', 'payment_history');
    }

    public function export_doc(){
      return $this->belongsTo('App\Models\Order\SalesOrder', 'id');
    }

  }
