import { ActionCreator, AnyAction, Reducer } from "redux";
import { Days, IDay, ITask, IWeek, Weeks } from "../types/model";

export type RootState = {
  tasks: ITask[];
  day: IDay;
  week: IWeek;
};

const initialState: RootState = {
  tasks: [],
  day: Days[0],
  week: Weeks[0],
};

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const SET_CURRENT_DAY = "SET_CURRENT_DAY";
const SET_CURRENT_WEEK = "SET_CURRENT_WEEK";

export const addTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: ADD_TASK,
  task,
});

export const removeTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: REMOVE_TASK,
  task,
});

export const setCurrentDay: ActionCreator<AnyAction> = (day: IDay) => ({
  type: SET_CURRENT_DAY,
  day,
});

export const setCurrentWeek: ActionCreator<AnyAction> = (week: IWeek) => ({
  type: SET_CURRENT_WEEK,
  week,
});

export const rootReducer: Reducer<RootState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(action.task),
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks:
          state.tasks.indexOf(action.task) !== -1
            ? state.tasks.splice(action.task, 1)
            : state.tasks,
      };
    case SET_CURRENT_DAY:
      return {
        ...state,
        day: action.day,
      };  
    case SET_CURRENT_WEEK:
      return {
        ...state,
        week: action.week,
      };
    default:
      return state;
  }
};
