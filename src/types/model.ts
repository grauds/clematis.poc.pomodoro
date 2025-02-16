import {
  getDay,
  getMonday,
  getMondayTwoWeeksAgo,
  getPreviousMonday,
  sameDay,
} from '../utils/time';

export enum ETaskStatus {
  NOT_STARTED,
  RUNNING,
  PAUSED,
  DONE,
  IN_PROGRESS,
}

export enum EPomodoroStatus {
  NOT_STARTED,
  RUNNING,
  PAUSED,
  BREAK_RUNNING,
  BREAK_PAUSED,
  DONE,
  IN_PROGRESS,
}

export enum ETheme {
  SYSTEM,
  LIGHT,
  DARK,
}

export interface ITask {
  id: string; // id of the task
  name: string; // name of the task
  no: number; // number of the task in the original sorted list
  status: ETaskStatus; // status of the task
  pomodori: IPomodoro[]; // array of all pomodori configured for the task
}

export interface IPomodoro {
  id: number; // id of the pomodoro
  seconds: number; // configurable countdown seconds for the current run
  breakSeconds: number; // configurable countdown seconds for the break after the task
  time: number; // total running time in seconds
  pause: number; // total time on pause in seconds
  break: number; // total time on break in seconds
  status: EPomodoroStatus; // status of the pomodoro
  date?: Date; // date of done
}

export interface ISettings {
  soundOn: boolean;
  pomodoro: number; // time of one pomodoro, seconds
  break: number; // time of a break, seconds
  longBreak: number; // time of a long break, seconds
  longBreakAfterPomodoro: number; // the number of pomodoro followed by a long break
}

export const defaultSettings: ISettings = {
  pomodoro: 20 * 60,
  break: 10 * 60,
  longBreak: 30 * 60,
  longBreakAfterPomodoro: 4,
  soundOn: true,
};

export function freshPomodoro(id: number, settings: ISettings): IPomodoro {
  return {
    id: id,
    seconds: settings.pomodoro,
    breakSeconds: settings.break,
    time: 0,
    pause: 0,
    break: 0,
    status: EPomodoroStatus.NOT_STARTED,
  };
}

export function longBreakFreshPomodoro(
  id: number,
  settings: ISettings,
): IPomodoro {
  return {
    ...freshPomodoro(id, settings),
    breakSeconds: settings.longBreak,
  };
}

export function getDayPomodoriDone(
  tasks: ITask[],
  dayStats: IDayStats,
): number {
  let pomodoriDone = 0;
  tasks.forEach((task) => {
    task.pomodori.forEach((pomodoro) => {
      if (
        pomodoro.status === EPomodoroStatus.DONE &&
        pomodoro.date &&
        sameDay(pomodoro.date, dayStats.date)
      ) {
        pomodoriDone++;
      }
    });
  });
  return pomodoriDone;
}

export function getWeekDays(week: IWeek): IDayStats[] {
  let monday: Date;

  switch (week.id) {
    case EWeek.THIS_WEEK:
      monday = getMonday(new Date());
      break;
    case EWeek.PREVIOUS_WEEK:
      monday = getPreviousMonday(new Date());
      break;
    case EWeek.TWO_WEEKS_AGO:
      monday = getMondayTwoWeeksAgo(new Date());
      break;
    default:
      monday = getMonday(new Date());
  }

  return newWeekStats(monday);
}

export function getWeekMaxTime(
  weekstats: IDayStats[],
  week: IWeek,
): { weekDays: IDayStats[]; maxTime: number } {
  const weekDays = getWeekDays(week);

  let maxTime = 0;

  weekDays.forEach((weekDay: IDayStats) => {
    const dayStats: IDayStats = getDayStats(weekstats, weekDay.date);
    maxTime = maxTime > dayStats.time ? maxTime : dayStats.time;
  });

  return { weekDays, maxTime };
}

export interface IDay {
  short: string;
  name: string;
}

export const Days: IDay[] = [
  {
    short: 'Пн',
    name: 'Понедельник',
  },
  {
    short: 'Вт',
    name: 'Вторник',
  },
  {
    short: 'Ср',
    name: 'Среда',
  },
  {
    short: 'Чт',
    name: 'Четверг',
  },
  {
    short: 'Пт',
    name: 'Пятница',
  },
  {
    short: 'Сб',
    name: 'Суббота',
  },
  {
    short: 'Вс',
    name: 'Воскресенье',
  },
];

export interface IWeek {
  id: string;
  text: string;
}

export enum EWeek {
  THIS_WEEK = '0',
  PREVIOUS_WEEK = '1',
  TWO_WEEKS_AGO = '2',
}

export const Weeks: IWeek[] = [
  {
    id: EWeek.THIS_WEEK,
    text: 'Эта неделя',
  },
  {
    id: EWeek.PREVIOUS_WEEK,
    text: 'Прошедшая неделя',
  },
  {
    id: EWeek.TWO_WEEKS_AGO,
    text: '2 недели назад',
  },
];

export interface IDayStats extends IDay {
  date: Date; // date of the stats
  time: number; // total running time in seconds
  pause: number; // total time on pause in seconds
  break: number; // total time on break in seconds
  stops: number; // total number of stops (timer re-sets) before the task is done
}

export class DayStats implements IDayStats {
  date: Date;
  time: number = 0;
  pause: number = 0;
  break: number = 0;
  stops: number = 0;
  short: string = '';
  name: string = '';

  constructor(date?: Date) {
    this.date = date ?? new Date();
  }
}

export function emptyStats(date: Date): IDayStats {
  return {
    ...new DayStats(date),
    ...Days[getDay(date)],
  };
}

export function findDayStats(
  stats: IDayStats[],
  date: Date,
): IDayStats | undefined {
  const days: IDayStats[] = stats.filter((day) => {
    return sameDay(day.date, date);
  });
  if (days.length > 0) {
    return days[0];
  } else {
    return undefined;
  }
}

export function getDayStats(stats: IDayStats[], date: Date): IDayStats {
  const day: IDayStats | undefined = findDayStats(stats, date);
  if (day) {
    return day;
  } else {
    return emptyStats(date);
  }
}

export function newCurrentDayStats(): IDayStats {
  return emptyStats(new Date());
}

export function createCurrentDayStats(stats: IDayStats[]): IDayStats {
  const dayStats: IDayStats | undefined = findDayStats(stats, new Date());
  if (dayStats) {
    return dayStats;
  } else {
    stats.push(newCurrentDayStats());
    return stats[stats.length - 1];
  }
}

export function newWeekStats(dateMonday: Date): IDayStats[] {
  return Days.map((day: IDay, i: number) => {
    const date = new Date(dateMonday.toDateString());
    date.setDate(dateMonday.getDate() + i);
    return emptyStats(date);
  });
}
