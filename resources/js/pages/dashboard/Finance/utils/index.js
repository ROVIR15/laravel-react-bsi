import { isArray, isEmpty, isEqual } from 'lodash';

/**
 * Transform color and size where has '1' value to null
 * 
 * @param {string} payload 
 * @returns string
 */

function getItemName(name, size, color){

  let _size = isEqual(size, '1') ? '' : size;
  let _color = isEqual(color, '1') ? '' : color;

  return `${name} ${_color} ${_size}`
}

// for sales order and invoice
export const orderItemToInvoiceItem = (payload) => {
  function total(qty, price) {
    return qty * price;
  }

  if (!isArray(payload)) return [];

  const temp = payload.map((item, index) => {
    return {
      id: item.id,
      shipment_item_id: item.id,
      order_item_id: item.order_item.id,
      item_name: getItemName(item.order_item.product_feature.product.goods.name, item.order_item.product_feature.size, item.order_item.product_feature.color),
      name: item.order_item.product_feature.product.goods.name,
      size: item.order_item.product_feature.size,
      color: item.order_item.product_feature.color,
      qty: item.qty_shipped,
      amount: item.order_item.unit_price,
      total: total(item.qty_shipped, item.order_item.unit_price)
    };
  });

  return temp;
};

// for purchase order transformed to vendor bills
export const orderItemToVendorBillItems = (payload) => {
  function total(qty, price) {
    return qty * price;
  }

  if (!isArray(payload)) return [];

  const temp = payload.map((item, index) => {
    return {
      id: item.id,
      order_item_id: item.id,
      item_name: getItemName(item.product_feature.product.goods.name, item.product_feature.size, item.product_feature.color),
      name: item.product_feature.product.goods.name,
      size: item.product_feature.size,
      color: item.product_feature.color,
      qty: item.qty,
      amount: item.unit_price,
      total: total(item.qty, item.unit_price)
    };
  });

  return temp;
};

export const shipmentItemToInvoiceItem = (payload) => {
  function total(qty, price) {
    return qty * price;
  }

  if (!isArray(payload)) return [];

  const temp = payload.map((item, index) => {
    return {
      id: index + 1,
      shipment_item_id: item.id,
      order_item_id: item.order_item.id,
      name: item.order_item.product_feature.product.goods.name,
      size: item.order_item.product_feature.size,
      color: item.order_item.product_feature.color,
      qty: item.qty_shipped,
      amount: item.order_item.unit_price,
      total: total(item.qty_shipped, item.order_item.unit_price)
    };
  });

  return temp;
};

export const invoiceItemArrangedData = (payload) => {
  function total(qty, price) {
    return qty * price;
  }
  if (!isArray(payload)) return [];
  const temp = payload.map((item, index) => {
    return {
      id: item.id,
      order_item_id: item.order_item.id,
      name: item.order_item.product_feature.product.goods.name,
      size: item.order_item.product_feature.size,
      color: item.order_item.product_feature.color,
      qty: item.qty,
      amount: item.amount,
      total: total(item.qty, item.amount)
    };
  });

  return temp;
};


export const generateInvSerialNumber = (payload, type) => {
  if(type === 1) return `SO-INV No. ${payload.id}/${payload?.sales_order?.id}-${payload?.sales_order?.sales_order?.id}/${payload.invoice_date}/${payload?.sales_order?.sales_order?.po_number}`;
  if(type === 2) return `PO-INV No. ${payload.id}/${payload?.purchase_order?.id}-${payload?.purchase_order?.purchase_order?.id}/${payload.invoice_date}/${payload?.purchase_order?.purchase_order?.po_number}`;
  else return `INV No.`
}

export const generateInvSerialNumber_alt = (payload, type) => {
  if(type === 1) return `SO-INV No. ${payload.id}/${payload?.sales_order?.id}-${payload?.sales_order?.sales_order?.id}/${payload.invoice_date}/${payload?.sales_order?.sales_order?.po_number}`;
  if(type === 2) return `PO-INV No. ${payload.id}/${payload?.purchase_order?.id}-${payload?.purchase_order?.purchase_order?.id}/${payload.invoice_date}/${payload?.purchase_order?.purchase_order?.po_number}`;
  else return `INV No.`
}