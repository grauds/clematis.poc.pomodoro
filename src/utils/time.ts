export const formatTime = (secondsTime: number) => {
    const minutes = Math.floor(secondsTime / 60).toString().padStart(2, '0');
    const seconds = (secondsTime % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};


//https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
export function getMonday(d: Date): Date {
  d = new Date(d);
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
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