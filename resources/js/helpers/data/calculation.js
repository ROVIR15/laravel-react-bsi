import { isArray, isEmpty } from "lodash";

export function findTotalQty(array){
  if(!isArray(array)) return 0;
  if(isEmpty(array)) return 0;
  return array.reduce((initial, next) => initial + parseInt(next.qty), 0);
}

export function findTotalAmountOfQuotation(array){
  if(!isArray(array)) return 0;
  if(isEmpty(array)) return 0;
  return array.reduce((initial, next) => initial + Math.floor(parseFloat(next.qty) * parseFloat(next.unit_price)), 0);
}