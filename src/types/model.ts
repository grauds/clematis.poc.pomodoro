import { v4 as uuidv4 } from "uuid";

export interface ITask {
  id: string;
  name: string;
}

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

