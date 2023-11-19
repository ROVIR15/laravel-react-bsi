function strPadLeft(value, length, padChar) {
  value = isString(value) ? value : String(value)
  while (value.length < length) {
      value = padChar + value;
  }
  return value;
}

export function generalizeSKU(order_item_id, product_feature_id, product_id){
  return `${strPadLeft(order_item_id, 4, 0)}-${strPadLeft(product_feature_id, 4, 0)}-${strPadLeft(product_id, 4, 0)}`
}

export function generalizeSOPO(order_id, document_id, type){
  if('po' === type) return `PO-${strPadLeft(order_id, 4, 0)}${strPadLeft(document_id, 4, 0)}`
  if('so' === type) return `SO-${strPadLeft(order_id, 4, 0)}${strPadLeft(document_id, 4, 0)}`
  return `${strPadLeft(order_id, 4, 0)}`
}