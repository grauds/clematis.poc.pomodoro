import { v4 as uuidv4 } from "uuid";

export interface ITask {
  id: string;
  name: string;
  pomodori: number;
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

