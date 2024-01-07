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
  week: Weeks[0] 
};

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK_POMODORO = "ADD_TASK_POMODORO";
const REMOVE_TASK_POMODORO = "REMOVE_TASK_POMODORO";
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

export const addTaskPomodoro: ActionCreator<AnyAction> = (task: ITask) => ({
  type: ADD_TASK_POMODORO,
  task,
});

export const removeTaskPomodoro: ActionCreator<AnyAction> = (task: ITask) => ({
  type: REMOVE_TASK_POMODORO,
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

const updatePomodori = (pomodori: number, action: AnyAction, state = initialState) => {

  const index = state.tasks.findIndex((task) => action.task.id === task.id);
  action.task.pomodori = action.task.pomodori ? action.task.pomodori + pomodori : 1

  if (index !== -1 && action.task.pomodori > 0) {
    return {
      ...state,
      tasks:
        state.tasks
          .slice(0, index)
          .concat(action.task)
          .concat(state.tasks.slice(index + 1, state.tasks.length)) 
    }
  } else {
    return state
  }
}

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
    case ADD_TASK_POMODORO:
      return updatePomodori(1, action, state)
    case REMOVE_TASK_POMODORO:
      return updatePomodori(-1, action, state)
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
