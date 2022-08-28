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

export function productFeatureArrangedData(array){
    if(isEmpty(array)) return 
    let arranged = array.map((x) => {
      console.log(x.product)
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
      facility,
      qty_on_hand
    } = x;

    return {
        id, 
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
    role_type_id: party_roles[0].role_type.id,
    role_type: party_roles[0].role_type
  }
}