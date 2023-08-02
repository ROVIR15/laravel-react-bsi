import { initial, isEmpty, isUndefined } from 'lodash';
import moment from 'moment';

export function bomitem_data_alt(array, filter) {

  if (isEmpty(array)) return [];
  let arranged = array.map((x) => {
    const { id, consumption, allowance, unit_price, bom_id, product_feature } = x;

    let item_name = `${product_feature?.product?.goods?.name} - ${product_feature?.color}`;

    return {
      id,
      product_feature: product_feature?.id,
      product_id: product_feature?.product?.id,
      name: product_feature?.product?.goods?.name,
      size: product_feature?.size,
      color: product_feature?.color,
      item_name,
      bom_id,
      qty: 0,
      category_id: product_feature?.product_category?.category?.id,
      category: product_feature?.product_category?.category?.name,
      satuan: product_feature?.product?.goods?.satuan,
      sub_category: product_feature?.product_category?.sub?.name,
      consumption: parseFloat(consumption).toFixed(5),
      allowance: parseFloat(allowance).toFixed(0),
      unit_price: parseFloat(unit_price).toFixed(2)
    };
  });

  return arranged;
}

export function material_transfer_items(array, filter) {
  if (isEmpty(array)) return [];
  let arranged = array.map((x) => {
    const { id, material_transfer_id, transfer_qty, product_feature, product, transferred } = x;
    const transferred_qty = isEmpty(transferred) || isUndefined(transferred) ? 0 : transferred.reduce((initial, next) => initial + parseFloat(next.transferred_qty), 0);

    let item_name = `${product?.goods?.name} ${product_feature?.color} - ${product_feature?.size}`;

    return {
      id,
      material_transfer_id: material_transfer_id,
      product_feature_id: product_feature?.id,
      product_id: product?.id,
      goods_id: product?.goods?.id,
      name: product?.goods?.name,
      size: product_feature?.size,
      color: product_feature?.color,
      item_name,
      transfer_qty: transfer_qty,
      transferred_qty,
      category_id: product_feature?.product_category?.category?.id,
      category: product_feature?.product_category?.category?.name,
      satuan: product?.goods?.satuan,
      sub_category: product_feature?.product_category?.sub?.name
    };
  });

  return arranged;
}

export function display_all_stock_adjustment_resources(array) {
  if (isEmpty(array)) return [];
  let arranged = array.map((x, index) => {
    const { id, date, change_type, facility, user } = x;

    let _serial_number = `OP-000${facility?.id}${change_type}${user?.id}${id}`;

    return {
      id,
      _serial_number,
      date,
      change_type: change_type === 1 ? 'Penambahan atau Pengurangan' : 'Penyesuaian',
      facility_name: facility?.name,
      facility_id: facility?.id,
      user_id: user?.id,
      user_name: user?.name
    };
  });

  return arranged;
}

export function display_material_transfer_resources(array) {
  if (isEmpty(array)) return [];
  let arranged = array.map((x, index) => {
    const { facility, est_transfer_date, created_at, items, status, id } = x;

    let total_req_qty = items.reduce((initial, next) => {
      return initial + parseFloat(next?.transfer_qty);
    }, 0);

    return {
      id: index + 1,
      status: status[0]?.status,
      mt_id: id,
      date: created_at,
      est_transfer_date: est_transfer_date,
      qty: total_req_qty?.toFixed(2),
      transferred_qty: 0
    };
  });

  return arranged;
}

export function adjustment_data_prep(array) {
  if (isEmpty(array)) return [];
  let arranged = array.map((x, index) => {
    const {
      id,
      adjustment_id,
      product_id,
      product_feature_id,
      initial_qty,
      changes,
      product,
      product_feature: { size, color }
    } = x;

    // let diff_qty = initial_qty - changes;

    let item_name = `${
      product?.goods ? product?.goods?.name : product?.service?.name
    } ${size} - ${color}`;

    return {
      id: index + 1,
      adjustment_id,
      product_id,
      product_feature_id,
      current_qty: initial_qty,
      counted_qty: changes,
      item_name,
      satuan: product?.goods?.satua
    };
  });

  return arranged;
}