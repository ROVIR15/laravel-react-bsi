import { isEmpty, isUndefined } from 'lodash';

export function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

export function firstLetterUpperCase(str) {
  if(isEmpty(str)  || isUndefined(str)) return;
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}

export function strPadLeft(value, length, padChar) {
  value = isString(value) ? value : String(value)
  while (value.length < length) {
      value = padChar + value;
  }
  return value;
}