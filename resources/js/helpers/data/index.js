import { isArray, sum } from 'lodash';
import moment from 'moment';
import { dateDifference } from '../../utils/formatTime';

export function isEmpty(array) {
  if (!Array.isArray(array)) return true;
  return !array.length;
}

export function isEditCondition(array, id) {
  if (!array.length) console.error('Require an Array type');
  if (array[4].valueOf() === undefined) return false;
  return parseInt(array[4]) === parseInt(id);
}

export function goodsDataArranged(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      product: {
        product_category: { category }
      }
    } = x;
    return { ...x, category: category.name, sub_category: category.sub.name };
  });
  return arranged;
}

export function rearrangeData(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      product: {
        product_category: { category }
      }
    } = x;
    return { ...x, category: category.name, sub_category: category.sub.name };
  });
  return arranged;
}

export function productFeatureArrangedData(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      product_id,
      color,
      size,
      product: {
        goods: { name, satuan, imageUrl, value, brand, created_at, updated_at }
      }
    } = x;

    return {
      id,
      product_id,
      name,
      color,
      size,
      satuan,
      value,
      brand,
      created_at,
      updated_at
    };
  });

  return arranged;
}

export function _miniFuncSupermarket(array, _so_id) {
  if (isEmpty(array)) return;
  let arranged = array.map((x, index) => {
    const {
      id,
      order_id,
      product_feature: {
        product_id,
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      }
    } = x;
    return {
      id: index + 1,
      numbering_id: 0,
      date: '1990-01-01',
      order_id,
      order_item_id: id,
      sales_order_id: _so_id,
      product_feature_id: product_feature.id,
      po_number: ' ',
      color,
      size,
      name,
      numbering: ' '
    };
  });

  return arranged;
}

export function _orderItem(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x, index) => {
    const {
      id,
      order_id,
      product_feature: {
        product_id,
        color,
        size,
        product: {
          goods: { name, satuan }
        },
        ...product_feature
      },
      qty,
      description
    } = x;
    return {
      id: id,
      order_item_id: id,
      color,
      size,
      name,
      satuan,
      qty_order: qty,
      deliv_qty: 0,
      description
    };
  });

  return arranged;
}

export function _miniFuncCutting(array, _so_id) {
  if (isEmpty(array)) return;
  let arranged = array.map((x, index) => {
    const {
      order_id,
      product_feature: {
        product_id,
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      },
      ...order_item
    } = x;
    return {
      id: index + 1,
      date: moment(new Date()).format('YYYY-MM-DD'),
      order_id,
      order_item_id: order_item.id,
      sales_order_id: _so_id,
      product_feature_id: product_feature.id,
      po_number: '',
      color,
      size,
      name
    };
  });

  return arranged;
}

export function _miniFunc(array, _so_id) {
  if (isEmpty(array)) return;
  let arranged = array.map((x, index) => {
    const {
      order_id,
      product_feature: {
        product_id,
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      },
      ...order_item
    } = x;
    return {
      id: index + 1,
      supermarket_id: 0,
      date: moment(new Date()).format('YYYY-MM-DD'),
      order_id,
      order_item_id: order_item.id,
      sales_order_id: _so_id,
      product_feature_id: product_feature.id,
      po_number: '',
      color,
      size,
      name,
      numbering: ' '
    };
  });

  return arranged;
}

export function _miniFuncQC(array, _so_id) {
  if (isEmpty(array)) return;
  let arranged = array.map((x, index) => {
    const {
      order_id,
      product_feature: {
        product_id,
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      },
      ...order_item
    } = x;
    return {
      id: index + 1,
      ms_id: 0,
      date: moment(new Date()).format('YYYY-MM-DD'),
      order_id,
      order_item_id: order_item.id,
      sales_order_id: _so_id,
      product_feature_id: product_feature.id,
      po_number: '',
      color,
      size,
      name
    };
  });

  return arranged;
}

export function _miniFuncFG(array, _so_id) {
  if (isEmpty(array)) return;
  let arranged = array.map((x, index) => {
    const {
      order_id,
      product_feature: {
        product_id,
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      },
      ...order_item
    } = x;
    return {
      id: index + 1,
      qc_id: 0,
      date: moment(new Date()).format('YYYY-MM-DD'),
      order_id,
      order_item_id: order_item.id,
      sales_order_id: _so_id,
      product_feature_id: product_feature.id,
      po_number: '',
      color,
      size,
      name
    };
  });

  return arranged;
}

export function optionProductFeatureV3(array, filter) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      product_id,
      color,
      size,
      product,
      product_category: {
        category: { sub, ...category }
      }
    } = x;

    let item_name = `${
      product?.goods ? product?.goods?.name : product?.service?.name
    } - ${color}`;

    return {
      id,
      product_id,
      item_name,
      satuan: product?.goods ? product?.goods?.satuan : product?.service?.satuan,
      value: product?.goods ? product?.goods?.value : product?.service?.value,
      category_id: category?.id,
      category: category?.name,
      sub_category: sub?.name,
      imageUrl: product?.goods?.imageUrl
    };
  });

  return arranged.filter((obj, index, self) => (index === self.findIndex(t => t.item_name === obj.item_name)))
}

export function itemNameV1(data) {
  if (isEmpty(data)) return;
  let item_name = `${data?.product?.goods?.name} - ${data?.color}`;

  return {
    product_id,
    item_name,
  };
}

export function inventoryItemWithStock(array, filter) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      product_id,
      color,
      size,
      product,
      product_category: {
        category: { sub, ...category }
      },
      stock_in,
      stock_shipped_out
    } = x;

    let item_name = `${
      product?.goods ? product?.goods?.name : product?.service?.name
    } ${size} - ${color}`;

    let _stock_in = !isEmpty(stock_in);
    let _stock_out = !isEmpty(stock_shipped_out);

    let current_qty = _stock_in && _stock_out ? (stock_in[0]?.qty - stock_shipped_out[0]?.qty) : 0
    let counted_qty = 0


    return {
      id,
      product_id,
      name: product?.goods ? product?.goods?.name : product?.service?.name,
      color,
      size,
      item_name,
      satuan: product?.goods ? product?.goods?.satuan : product?.service?.satuan,
      value: product?.goods ? product?.goods?.value : product?.service?.value,
      brand: product?.goods ? product?.goods?.brand : product?.service?.brand,
      category_id: category?.id,
      category: category?.name,
      sub_category: sub?.name,
      created_at: product?.goods?.created_at,
      updated_at: product?.goods?.updated_at,
      imageUrl: product?.goods?.imageUrl,
      stock_in: _stock_in ? stock_in[0]?.qty : 0,
      stock_out: _stock_out ? stock_shipped_out[0]?.qty : 0,
      current_qty,
      counted_qty
    };
  });

  if (filter) return arranged.filter((x) => x.sub_category === filter);
  return arranged;
}

export function optionProductFeature(array, filter) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      product_id,
      color,
      size,
      product,
      product_category: {
        category: { sub, ...category }
      }
    } = x;

    let item_name = `${
      product?.goods ? product?.goods?.name : product?.service?.name
    } ${size} - ${color}`;

    return {
      id,
      product_id,
      name: product?.goods ? product?.goods?.name : product?.service?.name,
      color,
      size,
      item_name,
      satuan: product?.goods ? product?.goods?.satuan : product?.service?.satuan,
      value: product?.goods ? product?.goods?.value : product?.service?.value,
      brand: product?.goods ? product?.goods?.brand : product?.service?.brand,
      category_id: category?.id,
      category: category?.name,
      sub_category: sub?.name,
      created_at: product?.goods?.created_at,
      updated_at: product?.goods?.updated_at,
      imageUrl: product?.goods?.imageUrl
    };
  });

  if (filter) return arranged.filter((x) => x.sub_category === filter);
  return arranged;
}

export function productItemArrangedData(x) {
  const {
    id,
    product_id,
    color,
    size,
    product: {
      goods: { name, satuan, imageUrl, value, brand, created_at, updated_at }
    }
  } = x;
  return {
    id: x?.id,
    product_id: x?.product_id,
    name: x?.product?.goods?.name,
    color: x?.color,
    size: x?.size,
    satuan: x?.product?.goods?.satuan,
    value: x?.product?.goods?.value,
    brand: x?.product?.goods?.brand,
    created_at: x?.product?.goods?.created_at,
    updated_at: x?.product?.goods?.updated_at
  };
}

export function inventoryItemArrangedItem(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const { id, info, facility, qty_on_hand } = x;

    return {
      id,
      info,
      qty_on_hand,
      facility_name: facility.name
    };
  });

  return arranged;
}

export function orderItemArrangedData(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      order_id,
      product_feature: {
        color,
        size,
        product: {
          goods: { name, brand, created_at, updated_at },
          ...product
        },
        ...product_feature
      }
    } = x;

    return {
      id,
      order_id,
      product_id: product.id,
      product_feature_id: product_feature.id,
      color,
      size,
      name,
      brand,
      po_number: '',
      qty_loading: 0,
      output: 0
    };
  });

  return arranged;
}

export function outputSewingArrangedData(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      sales_order_id,
      qty_loading,
      output,
      po_number,
      product_feature: {
        color,
        size,
        product: {
          goods: { name, brand, created_at, updated_at }
        },
        ...product_feature
      }
    } = x;

    return {
      id,
      date,
      order_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      color,
      size,
      name,
      brand,
      po_number,
      qty_loading,
      output
    };
  });

  return arranged;
}

export function optionSewing(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      po_number,
      product_feature: { product, ...product_feature },
      output,
      qc
    } = x;
    let res = {
      id,
      date,
      order_id,
      order_item_id: order_item_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      name: `${product?.goods?.name} ${product_feature?.color} ${product_feature?.size}`,
      qty_loading: parseInt(output) - parseInt(qc[0]?.total_output ? qc[0]?.total_output : 0)
    };
    return res;
  });

  return arranged;
}

export function outputQCArrangedData(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      qty_loading,
      output,
      po_number,
      product_feature: {
        color,
        size,
        product: {
          goods: { name, brand, created_at, updated_at }
        },
        ...product_feature
      }
    } = x;

    return {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      color,
      size,
      name,
      brand,
      po_number,
      qty_loading,
      output
    };
  });

  return arranged;
}

export function optionFG(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      po_number,
      product_feature: { product, ...product_feature },
      output,
      fg
    } = x;
    let res = {
      id,
      date,
      order_id,
      order_item_id: order_item_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      name: `${product?.goods?.name} ${product_feature?.color} ${product_feature?.size}`,
      qty_loading: parseInt(output) - parseInt(fg[0]?.total_output ? fg[0]?.total_output : 0)
    };
    return res;
  });

  return arranged;
}

export function outputFGArrangedData(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      qty_loading,
      output,
      po_number,
      box,
      product_feature: {
        color,
        size,
        product: {
          goods: { name, brand, created_at, updated_at }
        },
        ...product_feature
      }
    } = x;

    return {
      id,
      date,
      box: box || '',
      order_id,
      order_item_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      color,
      size,
      name,
      brand,
      po_number,
      qty_loading,
      output
    };
  });

  return arranged;
}

export function optionCutting(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      output,
      po_number,
      product_feature: {
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      }
    } = x;

    return {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      color,
      size,
      name,
      output,
      numbering: ''
    };
  });

  return arranged;
}

export function optionNumbering(array) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      po_number,
      qty,
      numbering,
      product_feature: {
        color,
        size,
        product: {
          goods: { name }
        },
        ...product_feature
      }
    } = x;

    return {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      color,
      size,
      name,
      numbering,
      qty
    };
  });

  return arranged;
}

export function optionSupermarket(array) {
  if (isEmpty(array)) return;

  function check(param1, param2) {
    if (isEmpty(param2)) return param1;
    if (param1 === param2) return param1;
    else return param2;
  }

  let arranged = array.map((x) => {
    const {
      id,
      date,
      order_id,
      order_item_id,
      sales_order_id,
      po_number,
      product_feature: { product, ...product_feature },
      output,
      sewing
    } = x;

    let res = {
      id,
      date,
      order_id,
      order_item_id: check(order_item_id, sewing[0]?.order_item_id),
      sales_order_id,
      product_feature_id: product_feature.id,
      po_number,
      name: `${product?.goods?.name} ${product_feature?.color} ${product_feature?.size}`,
      numbering: '',
      qty_loading:
        parseInt(output) - parseInt(sewing[0]?.total_output ? sewing[0]?.total_output : 0)
    };
    return res;
  });

  return arranged;
}

export function calculateLayer(fabric_length, actual_spread_length) {
  const layer = parseFloat(fabric_length) / parseFloat(actual_spread_length);
  return Math.floor(layer);
}

export function calculateRestan(fabric_length, actual_spread_length) {
  if (!fabric_length && !actual_spread_length) return;
  return (
    parseFloat(fabric_length) -
    (calculateLayer(fabric_length, actual_spread_length) * actual_spread_length).toFixed(2)
  );
}

export function laborArrangedData(data) {
  const { id, email, name, party_roles } = data;
  return {
    name,
    email,
    phone_number: '083231',
    role_type_id: party_roles[0].role_type?.valueOf() ? party_roles[0].role_type.id : null,
    role_type: party_roles[0].role_type?.valueOf() ? party_roles[0].role_type : null
  };
}

export function _partyArrangedData(data) {
  const { id, name, email, npwp, address, party_roles } = data;
  return {
    id,
    name,
    email,
    npwp,
    phone_number: '083231',
    street: address?.street,
    city: address?.city,
    province: address?.province,
    country: address?.country,
    postal_code: address?.postal_code,
    role_type_id: party_roles[0]?.role_type?.valueOf() ? party_roles[0]?.role_type.id : null,
    role_type: party_roles[0]?.role_type?.valueOf() ? party_roles[0]?.role_type : null
  };
}

export function _partyAddress(data) {
  const { id, name, email, npwp, address } = data;
  return {
    id,
    name,
    email,
    npwp,
    phone_number: '083231',
    street: address?.street,
    city: address?.city,
    province: address?.province,
    country: address?.country,
    postal_code: address?.postal_code
  };
}

// Party

export function partyArrangedData(array) {
  if (!isArray(array)) return;
  return array.map(function (datum) {
    const {
      role_type,
      party: { id, name, email, address }
    } = datum;
    return {
      id,
      name,
      email,
      phone_number: '083231',
      street: address?.street,
      city: address?.city,
      province: address?.province,
      country: address?.country,
      postal_code: address?.postal_code,
      role_type_id: role_type?.id ? role_type.id : null,
      role_type: role_type ? role_type : null
    };
  });
}

// BOM

export function bomDocumentArranged(data) {
  const {
    operations,
    qty,
    id,
    margin,
    tax,
    product: {
      goods: { name, imageUrl }
    },
    bom_items,
    bom_services,
    variants,
    start_date,
    end_date
  } = data;

  let cal_operations = {};
  let cal_material_items = {};

  let work_days = dateDifference(end_date, start_date);

  if (isEmpty(operations)) {
    cal_operations = {
      total_work_days: 0,
      total_labor: 0,
      total_overhead_cost: 0,
      total_cost_of_wc: 0,
      cm_cost: 0,
      operations_numbers: 0
    };
  } else {
    cal_operations = operations.reduce((prevValue, nextValue) => {
      return {
        total_work_days:
          prevValue +
          (
            qty / nextValue.work_center_info.prod_capacity +
              nextValue.work_center_info.layout_produksi
          ),
        total_labors: prevValue + nextValue.work_center_info.labor_alloc,
        total_overhead_cost: prevValue + nextValue.work_center_info.overhead_cost,
        total_cost_of_wc:
          prevValue +
          (
            (((qty / nextValue.work_center_info?.prod_capacity) * 0.85) +
              nextValue.work_center_info?.layout_produksi) *
              nextValue.work_center_info?.cost_per_hour
          ),
        cm_cost:
          (prevValue +
            nextValue.work_center_info.overhead_cost +
            nextValue.work_center_info.cost_per_hour) /
          (nextValue.work_center_info.prod_capacity * 0.85),
        operations_numbers: operations.length
      };
    }, 0);
  }

  function totalConsumption(params) {
    return (parseFloat(params.allowance) / 100 + 1) * parseFloat(params.consumption);
  }

  if (isEmpty(bom_items)) {
    cal_material_items = {
      total_cost_of_items: 0,
      average_of_product_cost: 0,
      components_numbers: 0
    };
  } else {
    cal_material_items = bom_items.reduce(
      (prevValue, nextValue) => {
        return {
          total_cost_of_items:
            prevValue.total_cost_of_items +
            (totalConsumption(nextValue) * qty * nextValue.unit_price),
          average_of_product_cost:
            prevValue.average_of_product_cost +
            (totalConsumption(nextValue) * nextValue.unit_price),
          components_numbers: bom_items.length
        };
      },
      {
        total_cost_of_items: 0,
        average_of_product_cost: 0,
        components_numbers: 0
      }
    );
  }

  var additionalCost = 0;
  var average_add_cost = 0;
  var list_of_service = '';

  if (!isEmpty(bom_services)) {
    additionalCost = bom_services.reduce((initial, next) => {
      return initial + (parseFloat(next.unit_price) * parseInt(qty));
    }, 0);

    average_add_cost = (additionalCost / qty);

    list_of_service = bom_services.reduce((initial, next) => {
      return initial + `${next.product.service.name}, `;
    }, '');
  }

  return {
    bom_id: id,
    qty,
    imageUrl,
    tax,
    margin,
    ...cal_material_items,
    ...cal_operations,
    goods_name: name,
    size: variants?.size.valueOf() ? variants.size : null,
    color: variants?.color.valueOf() ? variants.color : null,
    start_date,
    end_date,
    qty_to_produce: qty,
    bom_name: `BOM-SO-${id}`,
    additionalCost,
    average_add_cost,
    list_of_service
  };
}

// Shipment

export function _shipmentItem(array) {
  if (!isArray(array)) return undefined;
  if (isEmpty(array)) return undefined;
  return array.map((x) => {
    const { id, order_item, qty_shipped, description } = x;

    let item_name = `${
      order_item?.product_feature?.product?.goods ? order_item?.product_feature?.product?.goods?.name : order_item?.product_feature?.product?.service?.name
    } - ${order_item?.product_feature?.size} -  ${order_item?.product_feature?.color}`;
    
    return {
      id,
      item_name,
      name: order_item?.product_feature?.product?.goods?.name,
      size: order_item?.product_feature?.size,
      color: order_item?.product_feature?.color,
      satuan: order_item?.product_feature?.product?.goods?.satuan,
      qty_order: order_item?.qty,
      deliv_qty: qty_shipped,
      qty_shipped,
      description: description
    };
  });
}

export function outboundShipmentArrangedData(array) {
  if (!isArray(array)) return undefined;
  if (isEmpty(array)) return undefined;
  let response = array.map((x) => {
    const {
      id,
      order_id,
      delivery_date,
      created_at,
      updated_at,
      order: {
        sales_order_id,
        sales_order: { po_number, party, ship }
      }
    } = x;

    return {
      id,
      order_id,
      sales_order_id,
      delivery_date,
      created_at,
      updated_at,
      po_number,
      party,
      ship
    };
  });

  return response;
}

export function outboundShipmentDetailedArrangedData(objectArray) {
  const {
    id,
    order_id,
    delivery_date,
    created_at,
    updated_at,
    order: {
      sales_order_id,
      sales_order: { po_number, party, ship }
    },
    items
  } = objectArray;

  let shipment_items = items.map((item) => {
    let {
      shipment_id,
      order_item_id,
      qty_shipped,
      order_item: { qty, product_feature },
      ..._item
    } = item;

    let { id, value, ..._pf } = productItemArrangedData(product_feature);

    return {
      ..._pf,
      product_feature_id: id,
      id: _item.id,
      shipment_id,
      order_item_id,
      qty_shipped,
      qty_order: qty
    };
  });

  return {
    id,
    order_id,
    sales_order_id,
    delivery_date,
    created_at,
    updated_at,
    po_number,
    party,
    ship,
    shipment_items
  };
}

// Machine

export function machineList(array) {
  if (!isArray(array)) return undefined;
  if (isEmpty(array)) return null;
  return array.map((item) => {
    let {
      product: { goods },
      category
    } = item;

    return {
      ...goods,
      category_id: category.id,
      category: category.name,
      sub_category: category.sub.name
    };
  });
}

export function machineData(obj) {
  if (!obj) return undefined;
  let {
    product: { goods },
    category
  } = obj;
  return { ...goods, category: category.id, sub_category: category.sub.name };
}

//
export function daysOfWorks(qty, targetEachDay, layout_produksi) {
  return Math.floor(qty / targetEachDay + layout_produksi);
}

// Servce
export function serviceList(array) {
  if (!isArray(array)) return [];
  if (isEmpty(array)) return [];
  return array.map((item) => {
    let {
      product_id,
      service: { service },
      category
    } = item;

    return { ...service, id: product_id, category: category.name, sub_category: category.sub.name };
  });
}

export function serviceList2(array) {
  if (!isArray(array)) return [];
  if (isEmpty(array)) return [];
  return array.map((item) => {
    let {
      product_id,
      service: { service },
      category
    } = item;

    return { ...service, category: category.name, sub_category: category.sub.name };
  });
}

export function BomServiceList(array) {
  if (!isArray(array)) return [];
  if (isEmpty(array)) return [];
  return array.map((item) => {
    let {
      bom_id,
      id,
      unit_price,
      product: { service }
    } = item;

    return { id, bom_id, unit_price, name: service.name };
  });
}

export function _getAddressInfoOfParty(array) {
  if (isEmpty(array)) return [];
  return array.reduce((initial, next) => [...initial, next?.info_address], []);
}

export function _getEmailInfoOfParty(array) {
  if (isEmpty(array)) return [];
  return array.reduce((initial, next) => [...initial, next?.info_email], []);
}

export function _getPhoneNumberInfoOfParty(array) {
  if (isEmpty(array)) return [];
  return array.reduce((initial, next) => [...initial, next?.info_number], []);
}
