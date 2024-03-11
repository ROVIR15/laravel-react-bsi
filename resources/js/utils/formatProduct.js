import { isString } from 'lodash';

export function strPadLeft(value, length, padChar) {
  value = isString(value) ? value : String(value);
  while (value.length < length) {
    value = padChar + value;
  }
  return value;
}

export function generalizeSKU(goods_id, product_id, product_feature_id, import_flag = 0) {
  if (import_flag === 1) {
    return `02-${strPadLeft(goods_id, 4, 0)}-${strPadLeft(product_id, 4, 0)}-${strPadLeft(
      product_feature_id,
      4,
      0
    )}`;
  } else if (import_flag === 2) {
    return `03-${strPadLeft(goods_id, 4, 0)}-${strPadLeft(product_id, 4, 0)}-${strPadLeft(
      product_feature_id,
      4,
      0
    )}`;
  } else {
    return `01-${strPadLeft(goods_id, 4, 0)}-${strPadLeft(product_id, 4, 0)}-${strPadLeft(
      product_feature_id,
      4,
      0
    )}`;
  }
}

export function generalizeSOPO(order_id, document_id, type) {
  if ('po' === type) return `PO-${strPadLeft(order_id, 4, 0)}${strPadLeft(document_id, 4, 0)}`;
  if ('so' === type) return `SO-${strPadLeft(order_id, 4, 0)}${strPadLeft(document_id, 4, 0)}`;
  return `${strPadLeft(order_id, 4, 0)}`;
}
