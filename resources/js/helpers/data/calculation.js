import { isArray, isEmpty } from "lodash";

export function findTotalQty(array){
  if(!isArray(array)) return 0;
  if(isEmpty(array)) return 0;
  return array.reduce((initial, next) => initial + next.qty, 0);
}

export function findTotalAmountOfQuotation(array){
  if(!isArray(array)) return 0;
  if(isEmpty(array)) return 0;
  return array.reduce((initial, next) => initial + Math.floor(next.qty * next.unit_price), 0);
}