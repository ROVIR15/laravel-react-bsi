import { isArray, sum } from 'lodash';
import { dateDifference } from '../../utils/formatTime';

export function isEmpty(array){
  if(!Array.isArray(array)) return true;
  return !array.length;
}

export function goodsDataArranged(array){
  if(isEmpty(array)) return 
  let arranged = array.map((x) => {
    const {product: {product_category: {category}}} = x;
    return {...x, category: category.name, sub_category: category.sub.name}
  })
  return arranged;
}

export function rearrangeData(array){
  if(isEmpty(array)) return 
  let arranged = array.map((x) => {
    const {product: {product_category: {category}}} = x;
    return {...x, category: category.name, sub_category: category.sub.name}
  })
  return arranged;
}

export function productFeatureArrangedData(array){
    if(isEmpty(array)) return 
    let arranged = array.map((x) => {
      const {
        id, 
        product_id, 
        color, 
        size, 
        product: {
          goods: {
              name, 
              satuan, 
              imageUrl, 
              value, 
              brand, 
              created_at, 
              updated_at
          }
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
          updated_at,
      }
      })

    return arranged;
} 

export function optionProductFeature(array, filter){
  if(isEmpty(array)) return 
  let arranged = array.map((x) => {
    const {
      id, 
      product_id, 
      color, 
      size, 
      product: {
        goods: {
            name, 
            satuan, 
            value, 
            brand, 
            created_at, 
            updated_at
        }
      },
      product_category: {
        category: {
          sub,
          ...category
        }
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
        category: category.name,
        sub_category: sub.name,
        created_at,
        updated_at,
    }
    })
  
  if(filter) return arranged.filter((x) => (x.sub_category === filter))
  return arranged;
} 

export function productItemArrangedData(x){
  const {
    id, 
    product_id, 
    color, 
    size, 
    product: { 
      goods: {
          name, 
          satuan, 
          imageUrl, 
          value, 
          brand, 
          created_at, 
          updated_at
      }
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
      updated_at,
    }
}

export function inventoryItemArrangedItem(array){
  if(isEmpty(array)) return 
  let arranged = array.map((x) => {
    const {
      id,
      info,
      facility,
      qty_on_hand
    } = x;

    return {
        id, 
        info,
        qty_on_hand,
        facility_name: facility.name,
    }})

  return arranged;
}

export function orderItemArrangedData(array){
  if(isEmpty(array)) return 
  let arranged = array.map((x) => {
    const {
      id, 
      order_id, 
      product_feature: {
        color,
        size,
        product: { 
          goods: {
              name, 
              brand, 
              created_at, 
              updated_at
          }
        },
        ...product_feature
      }
    } = x;
    
    return {
      id, 
      order_id,
      product_feature_id: product_feature.id,
      color,
      size,
      name,
      brand,
      po_number: '',
      qty_loading: 0,
      output: 0
    }
  })

  return arranged;
} 

export function outputSewingArrangedData(array){
  if(isEmpty(array)) return 
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
          goods: {
              name, 
              brand, 
              created_at, 
              updated_at
          }
        },
        ...product_feature
      },
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
    }
  })

  return arranged;
} 

export function optionQC(array){
  if(isEmpty(array)) return 
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
          goods: {
              name, 
              brand, 
              created_at, 
              updated_at
          }
        },
        ...product_feature
      },
      qc
    } = x;

    let res = {
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
      qty_loading: output
    }

    if (!isEmpty(qc)) return { ...res, qty_loading: output - qc[0].output_qc}
    else return res;
  })

  return arranged;
} 

export function outputQCArrangedData(array){
  if(isEmpty(array)) return 
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
          goods: {
              name, 
              brand, 
              created_at, 
              updated_at
          }
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
    }
  })

  return arranged;
} 

export function optionFG(array){
  if(isEmpty(array)) return 
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
          goods: {
              name, 
              brand, 
              created_at, 
              updated_at
          }
        },
        ...product_feature
      },
      fg
    } = x;
    
    let res = {
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
      qty_loading: output
    }

    if (!isEmpty(fg)) return { ...res, qty_loading: output - fg[0].output_fg}
    else return res;
  })

  return arranged;
} 

export function outputFGArrangedData(array){
  if(isEmpty(array)) return 
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
          goods: {
              name, 
              brand, 
              created_at, 
              updated_at
          }
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
    }
  })

  return arranged;
}

export function optionCutting(array){
  if(isEmpty(array)) return 
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
          goods: {
              name
          }
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
    }
  })

  return arranged;
}

export function optionNumbering(array){
  if(isEmpty(array)) return 
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
          goods: {
              name
          }
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
    }
  })

  return arranged;
}

export function optionSupermarket(array){
  if(isEmpty(array)) return 
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
          goods: {
              name
          }
        },
        ...product_feature
      },
      sewing
    } = x;
    
    let res = {
      id,
      supermarket_id: id, 
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
      qty_loading: qty
    }
    if (!isEmpty(sewing)) return { ...res, qty_loading: qty - sewing[0].output_sewing}
    return res;
  })

  return arranged;
}

export function calculateLayer(fabric_length, actual_spread_length){
  const layer = parseFloat(fabric_length)/parseFloat(actual_spread_length);
  return Math.floor(layer);
}

export function calculateRestan(fabric_length, actual_spread_length){
  if(!fabric_length && !actual_spread_length) return
  return parseFloat(fabric_length) - (calculateLayer(fabric_length,actual_spread_length) * actual_spread_length).toFixed(2);
}

export function laborArrangedData(data) {
  const { id, email, name, npwp, address: {street, city, province, country, postal_code}, party_roles} = data;
  return {
    name,
    email,
    npwp,
    phone_number: '083231',
    address: street,
    city,
    province, 
    country,
    postal_code,
    role_type_id: party_roles[0].role_type?.valueOf() ? party_roles[0].role_type.id : null,
    role_type: party_roles[0].role_type?.valueOf() ? party_roles[0].role_type : null
  }
}


// Party

export function partyArrangedData(array){
  if (!isArray(array)) return;
  return array.map(function(datum){
    const { role_type, party: {id, name, email, address: {street, city, province, country, postal_code}} } = datum
    return {
      id, name, email, phone_number: '083231', street, city, province, country, postal_code, 
      role_type_id: role_type?.id ? role_type.id : null,
      role_type: role_type ? role_type : null
    }
  })
}

// BOM 

export function bomDocumentArranged(data){
  const { operations, qty, id,
          product: {goods: {name}}, bom_items, variants, start_date, end_date} = data;
  
  let cal_operations = {};
  let cal_material_items = {};

  let work_days = dateDifference(end_date, start_date);

  if(isEmpty(operations)) {
     cal_operations = {
      total_labor: 0,
      total_overhead_cost: 0,
      total_cost_of_wc: 0,
      cm_cost: 0,
      operations_numbers: 0
    }
  } else {
    cal_operations = operations.reduce((prevValue, nextValue) => {
      return {
        total_labors: prevValue + nextValue.work_center_info.labor_alloc,
        total_overhead_cost:prevValue + nextValue.work_center_info.overhead_cost,
        total_cost_of_wc: (prevValue) + (work_days * nextValue.work_center_info.cost_per_hour),
        cm_cost: (prevValue + nextValue.work_center_info.overhead_cost+(work_days * nextValue.work_center_info.cost_per_hour))/qty,
        operations_numbers: operations.length
      }
    }, 0);

  }

  if(isEmpty(bom_items)) {
    cal_material_items ={
      total_cost_of_items: 0,
      average_of_product_cost: 0,
      components_numbers: 0
    }
  } else {

    if (bom_items.length > 1) {
      cal_material_items = bom_items.reduce((prevValue, nextValue) => {
        return {
          total_cost_of_items: Math.floor(prevValue.consumption*qty*prevValue.unit_price) + Math.floor(nextValue.consumption*qty*nextValue.unit_price),
          average_of_product_cost: Math.floor(prevValue.consumption*prevValue.unit_price) + Math.floor(nextValue.consumption*nextValue.unit_price),
          components_numbers: bom_items.length
        }
      })
    }

    else {
      cal_material_items = bom_items.reduce((prevValue, nextValue) => {
        return {
          total_cost_of_items: prevValue + Math.floor(nextValue.consumption*qty*nextValue.unit_price),
          average_of_product_cost: prevValue + Math.floor(nextValue.consumption*nextValue.unit_price),
          components_numbers: bom_items.length
        }
      }, 0)
    }
  }


  return {bom_id: id, ...cal_material_items, ...cal_operations, goods_name: name, size: variants?.size.valueOf() ? variants.size : null, color: variants?.color.valueOf() ? variants.color : null, start_date, end_date, qty_to_produce: qty, bom_name: `BOM-SO-${id}`}
}
