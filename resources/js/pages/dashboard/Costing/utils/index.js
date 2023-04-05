export function calculateRestan(params){
  if(!params.row.fabric_length && !params.row.actual_spread_length) return
  return parseFloat(params.row.fabric_length) - (calculateLayer(params) * params.row.actual_spread_length);
}

export const BOMSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  product_id: Yup.string().required('Product ID is required'),
  company_name: Yup.string().required('Company is required'),
  qty: Yup.number().required('Quantity BOM is required')
});