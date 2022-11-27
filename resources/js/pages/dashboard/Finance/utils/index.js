import { isArray, isEmpty } from 'lodash';

export const orderItemToInvoiceItem = (payload) => {
  console.log(payload)
  function total(qty, price) {
    return qty * price;
  }

  if (!isArray(payload)) return [];

  const temp = payload.map((item, index) => {
    return {
      id: index + 1,
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
  if(type === 1) return `INV No. ${payload.id}/${payload?.sales_order?.id}-${payload?.sales_order?.sales_order?.id}/${payload.invoice_date}/${payload?.sales_order?.sales_order?.po_number}`;
  if(type === 2) return `INV No. ${payload.id}/${payload?.purchase_order?.id}-${payload?.purchase_order?.purchase_order?.id}/${payload.invoice_date}/${payload?.purchase_order?.purchase_order?.po_number}`;
  else return `INV No.`
}