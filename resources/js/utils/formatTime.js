import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function dateDifference(_date1, _date2) {
  return Math.floor((new Date(_date1) - new Date(_date2)) / (1000*60*60*24))
}

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
