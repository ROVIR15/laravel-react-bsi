import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number, currency = 'idr') {
  let hasDecimalPlaces = number % 1 !== 0;
  let formatPattern = hasDecimalPlaces ? '0,0.00' : '0,0';
  let res = numeral(number).format(`${formatPattern}`);

  if (currency?.toLowerCase() === 'idr') {
    // Remove decimal places if they are zero
    if (!hasDecimalPlaces) {
      res = res.replace(/\.0+$/, '');
    }
    return `Rp. ${res}`;
  }
  if (currency?.toLowerCase() === 'usd') return `$ ${res}`;
  else return res;
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
