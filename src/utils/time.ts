export const formatTime = (secondsTime: number) => {
    const minutes = Math.floor(secondsTime / 60).toString().padStart(2, '0');
    const seconds = (secondsTime % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

/**
 * Returns zero based index of the date's day in the week
 * @param date to get day of
 * @returns zero based index of the date's day in the week
 */
export function getDay(date: Date) {
  const day = date.getDay();
  return date.getDay() - (day == 0 ? -6 : 1); // adjust when day is sunday
}
/**
 * Returns distance to Monday from the current date
 * @param date to get Monday date of
 * @returns distance to Monday from the current date
 */
export function getDiff(date: Date) {
  const day = date.getDay();
  return date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
}

//https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
export function getMonday(d: Date): Date {
  const diff = getDiff(new Date(d)); 
  return new Date(d.setDate(diff));
}

export function getPreviousMonday(d: Date): Date {
  const thisMonday = getMonday(d);
  return new Date(thisMonday.setDate(thisMonday.getDate() - 7))
}

export function getMondayTwoWeeksAgo(d: Date): Date {
  const thisMonday = getMonday(d);
  return new Date(thisMonday.setDate(thisMonday.getDate() - 14));
}

export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}