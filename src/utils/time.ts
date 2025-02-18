/**
 * Outputs seconds to minutes and seconds, padding the single digits with zeros
 * @param secondsTime time in seconds
 * @returns a formatted string, for example 09:45
 */
export const formatTime = (secondsTime: number): string => {
  const minutes = Math.floor(secondsTime / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsTime % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const formatMinsShort = (secondsTime: number): string => {
  const min = Math.floor(secondsTime / 60);

  const minutes = min.toString();
  return `${minutes} мин`;
};

export const formatMinsLong = (secondsTime: number): string => {
  const min = Math.floor(secondsTime / 60);

  const minutes = min.toString();

  let minLabel;

  switch (min % 10) {
    case 1:
      minLabel = 'минуту';
      break;
    case 2:
    case 3:
    case 4:
      minLabel = 'минуты';
      break;
    default:
      minLabel = 'минут';
  }

  return `${minutes} ${minLabel}`;
};

export const formatTimeShort = (secondsTime: number): string => {
  const min = Math.floor(secondsTime / 60);
  const sec = secondsTime % 60;

  const minutes = min > 0 ? min.toString() + ' мин' : '';
  const seconds = sec.toString() + ' сек';

  return `${minutes} ${seconds}`;
};

export const formatTimeLong = (secondsTime: number): string => {
  const min = Math.floor(secondsTime / 60);
  const sec = secondsTime % 60;

  const minutes = min.toString();
  const seconds = sec.toString();

  let minLabel;
  let secLabel;

  switch (min % 10) {
    case 1:
      minLabel = 'минуту';
      break;
    case 2:
    case 3:
    case 4:
      minLabel = 'минуты';
      break;
    default:
      minLabel = 'минут';
  }

  switch (sec % 10) {
    case 1:
      secLabel = 'секунду';
      break;
    case 2:
    case 3:
    case 4:
      secLabel = 'секунды';
      break;
    default:
      secLabel = 'секунд';
  }

  return `${minutes} ${minLabel} ${seconds} ${secLabel}`;
};

/**
 * Returns zero based index of the date's day in the week
 * @param date to get day of
 * @returns zero based index of the date's day in the week
 */
export function getDay(date: Date): number {
  const day = date.getDay();
  return date.getDay() - (day == 0 ? -6 : 1); // adjust when day is sunday
}
/**
 * Returns distance to Monday from the current date
 * @param date to get Monday date of
 * @returns distance to Monday from the current date
 */
export function getDiff(date: Date): number {
  const day: number = date.getDay();  
  return date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
}

//https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
export function getMonday(d: Date): Date {
  const diff = getDiff(new Date(d));
  const monday: Date = new Date(d.setDate(diff));
  monday.setMinutes(0)
  monday.setSeconds(0)
  monday.setMilliseconds(0)
  monday.setHours(0)
  return monday;
}

export function getAnotherDay(d: Date, delta: number): Date {
  const date = new Date(d)
  return new Date(date.setDate(date.getDate() + delta));
}

export function getPreviousMonday(d: Date): Date {
  const thisMonday = getMonday(d);
  return new Date(thisMonday.setDate(thisMonday.getDate() - 7));
}

export function getMondayTwoWeeksAgo(d: Date): Date {
  const thisMonday = getMonday(d);
  return new Date(thisMonday.setDate(thisMonday.getDate() - 14));
}

export function sameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
