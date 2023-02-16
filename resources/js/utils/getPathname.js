import { filter, isEmpty } from 'lodash';

export function getPathname(array) {
  if (!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

export function getPages(array) {
  if (!array.length) console.error('Require an Array type');
  return array[3];
}

export function getRefinedPathname(pages, _userData) {
  if (isEmpty(pages)) return false;
  if (isEmpty(_userData)) return false;

  let _array = pages?.pathname?.split('/');

  let roles = filter(_userData.pages, (_d) => {
    if (_d?.page.name === _array[3]) return _d;
  });

  if (isEmpty(roles)) return null;
  else
    return {
        name: roles[0]?.page?.name,
        feature: _array[4] ? _array[4] : null,
        insert: roles[0]?.insert,
        edit: roles[0]?.edit,
        delete: roles[0]?.delete
    };
}