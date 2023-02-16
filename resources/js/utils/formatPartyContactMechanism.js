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