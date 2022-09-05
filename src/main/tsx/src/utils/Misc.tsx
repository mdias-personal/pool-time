import { EventProps } from '../types/Props';

export function formatNumber(value: string): string {
  value.replaceAll(/D/g, '');
  [3, 7].map((d) => {
    if (value.length > d && value.charAt(d) !== '-') {
      value = value.substring(0, d) + '-' + value.substring(d, 12);
    }
  });
  if (value.length >= 12) {
    value = value.substring(0, 12);
  }
  return value;
}

export function getDateFromAppt(request?: EventProps): string {
  if (typeof request !== 'undefined') {
    const date = new Date(request.start);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return (
      date.getFullYear() +
      '-' +
      (month < 10 ? '0' : '') +
      month +
      '-' +
      (day < 10 ? '0' : '') +
      day
    );
  } else {
    return '';
  }
}
export function getTimeFromAppt(start: boolean, request?: EventProps): string {
  if (typeof request !== 'undefined') {
    const date = start ? new Date(request.start) : new Date(request.end);
    const hours = date.getHours();
    const mins = date.getMinutes();
    return (hours < 10 ? '0' : '') + hours + ':' + (mins < 10 ? '0' : '') + mins;
  } else {
    return '';
  }
}

export function compareStartDates(a: EventProps, b: EventProps): number {
  const a_date = new Date(a.start);
  const b_date = new Date(b.start);

  if (a_date == b_date) {
    return 0;
  } else if (a_date > b_date) {
    return 1;
  } else {
    return -1;
  }
}
