export function rearrange_data_in(array) {
  return array.map(function(x){
    const { id, order_item, qty_shipped } = x;

    let item_name = `${
      order_item?.product_feature?.product?.goods ? order_item?.product_feature?.product?.goods?.name : order_item?.product_feature?.product?.service?.name
    } - ${order_item?.product_feature?.size} -  ${order_item?.product_feature?.color}`;

    let sku = generalizeSKU(order_item?.product_feature?.product?.goods_id, order_item?.product_feature?.id, order_item?.product_feature?.product?.id);
    
    return ({
      po_date: order_item?.order?.purchase_order?.issue_date,
      po_serial: generalizeSOPO(order_item?.order?.id, order_item?.order?.purchase_order_id, 'po'),
      material_code : sku,
      country: order_item?.order?.purchase_order?.party?.address?.country,
      item_name,
      category : order_item?.product_feature?.product_category?.category?.sub?.name,
      qty: qty_shipped,
      unit_measurement : order_item?.product_feature?.product?.goods?.satuan,
      unit_price : order_item?.unit_price
    })
  })
}

export function rearrange_data_out(array) {
  return array.map(function(x){
    const { id, order_item, qty_shipped } = x;

    let item_name = `${
      order_item?.product_feature?.product?.goods ? order_item?.product_feature?.product?.goods?.name : order_item?.product_feature?.product?.service?.name
    } - ${order_item?.product_feature?.size} -  ${order_item?.product_feature?.color}`;

    let sku = generalizeSKU(order_item?.id, order_item?.product_feature?.id, order_item?.product_feature?.product?.id);
    
    return ({
      po_date: order_item?.order?.sales_order?.issue_date,
      po_serial: generalizeSOPO(order_item?.order?.id, order_item?.order?.sales_order_id, 'so'),
      material_code : sku,
      item_name,
      category : order_item?.product_feature?.product_category?.category?.name,
      qty: qty_shipped,
      unit_measurement : order_item?.product_feature?.product?.goods?.satuan,
      unit_price : order_item?.unit_price,
      buyer_name: order_item?.order?.sales_order?.party?.name, 
      country: order_item?.order?.sales_order?.party?.address?.country
    })
  })
}

export function rearrange_data_material_transfer(array){
  return array.map(function(x){
    const { id, info: { product_feature, product, transfer_qty, ...rest } } = x;

    let item_name = `${
      product?.goods ? product?.goods?.name : product?.service?.name
    } - ${product_feature?.size} -  ${product_feature?.color}`;

    let _stock_out = parseFloat(transfer_qty)
    let _stock_in = 0;

    let material_code = `MT-${product?.id}${product?.goods?.id}${product_feature?.id}`

    return ({
      material_code,
      item_name,
      category_name: product_feature?.product_category?.category?.name,
      unit_measurement: product?.goods?.satuan,
      initial_stock: 0,
      stock_in: 0,
      stock_out: _stock_out,
      final_stock: _stock_in - _stock_out,
      value: 0
    })
  })
}


export function generalizeSKU(order_item_id, product_feature_id, product_id){
  return `MT-${order_item_id}${product_feature_id}${product_id}`
}

function generalizeSOPO(order_id, document_id, type){
  if('po' === type) return `PO-${order_id}${document_id}`
  if('so' === type) return `SO-${order_id}${document_id}`
  return `${order_id}00`
}