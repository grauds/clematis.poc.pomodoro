import { getDay, sameDay } from "../utils/time";

export enum ETaskStatus {
  NOT_STARTED, RUNNING, PAUSED, DONE
}

export enum EPomodoroStatus {
  NOT_STARTED, RUNNING, PAUSED, BREAK_RUNNING, BREAK_PAUSED, DONE
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
}

export const freshPomodoro = {
  seconds: 20,
  breakSeconds: 10,
  time: 0,
  pause: 0,
  break: 0,
  status: EPomodoroStatus.NOT_STARTED,
};

export const longBreakFreshPomodoro = {
  ...freshPomodoro,
  breakSeconds: 20 * 60,
};

export function getTotalPomodoriDone(tasks: ITask[]): number {
  let totalPomodoroDone = 0;
  tasks.forEach((task) => {
    task.pomodori.forEach((pomodoro) => {
      if (pomodoro.status === EPomodoroStatus.DONE) {
        totalPomodoroDone++;
      }
    });
  });
  return totalPomodoroDone;
}

export interface IDay {
  short: string;
  name: string;
}

export const Days: IDay[] = [
  {
    short: 'Пн',
    name: 'Понедельник'
  },
  {
    short: 'Вт',
    name: 'Вторник'
  },
  {
    short: 'Ср',
    name: 'Среда'
  },
  {
    short: 'Чт',
    name: 'Четверг'
  },
  {
    short: 'Пт',
    name: 'Пятница'
  },
  {
    short: 'Сб',
    name: 'Суббота'
  },
  {
    short: 'Вс',
    name: 'Воскресенье'
  }
]

export interface IWeek {
  id: string;
  text: string;
}

export enum EWeek {
  THIS_WEEK = '0', PREVIOUS_WEEK = '1', TWO_WEEKS_AGO = '2'
}

export const Weeks: IWeek[] = [
  {
    id: EWeek.THIS_WEEK,
    text: "Эта неделя",
  },
  {
    id: EWeek.PREVIOUS_WEEK,
    text: "Прошедшая неделя",
  },
  {
    id: EWeek.TWO_WEEKS_AGO,
    text: "2 недели назад",
  },
];

export interface IDayStats extends IDay {
  date: Date; // date of the stats
  time: number; // total running time in seconds
  pause: number; // total time on pause in seconds
  break: number; // total time on break in seconds
  stops: number; // total number of stops (timer re-sets) before the task is done
}

export function emptyStats(date: Date): IDayStats {
    return {
      ...Days[getDay(date)],
      ...{
        date: date,
        time: 0,
        pause: 0,
        break: 0,
        stops: 0,
      },
    };
}

export function getDayStats(stats: IDayStats[], date: Date): IDayStats {
  const days: IDayStats[] = stats.filter((day) => {
    return sameDay(day.date, date);
  });
  if (days.length > 0) {
    return days[0];
  } else {
    return emptyStats(date)
  }
}

export function newCurrentDayStats(): IDayStats {
  return emptyStats(new Date());
}

export function createCurrentDayStats(stats: IDayStats[]): IDayStats {
  const dayStats: IDayStats | undefined = getDayStats(stats, new Date());
  if (dayStats) {
    return dayStats;
  } else {
    stats.push(newCurrentDayStats());
    return stats[stats.length - 1];
  }
}

export function newWeekStats(dateMonday: Date): IDayStats[] {
  const date = new Date(dateMonday);
  return Days.map((day: IDay, i: number) => {  
    return emptyStats(new Date(date.setDate(dateMonday.getDate() + i)))
  });
} 