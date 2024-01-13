import { v4 as uuidv4 } from "uuid";

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

export const Weeks: IWeek[] = [
  {
    id: uuidv4(),
    text: "Эта неделя",
  },
  {
    id: uuidv4(),
    text: "Прошедшая неделя",
  },
  {
    id: uuidv4(),
    text: "2 недели назад",
  },
];

