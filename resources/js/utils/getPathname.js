export function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

export function getPages(array){
  if(!array.length) console.error('Require an Array type');
  return array[3]
}