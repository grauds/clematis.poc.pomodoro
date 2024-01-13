import { ActionCreator, AnyAction, Reducer } from "redux";
import { Days, ETaskStatus, IDay, ITask, IWeek, Weeks } from "../types/model";

export type RootState = {
  tasks: ITask[];
  day: IDay;
  week: IWeek;
};

export const initialState: RootState = {
  tasks: [],
  day: Days[0],
  week: Weeks[0],
};

const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const MOVE_TASK_BEFORE = "MOVE_TASK_BEFORE";

const ADD_TASK_POMODORO = "ADD_TASK_POMODORO";
const REMOVE_TASK_POMODORO = "REMOVE_TASK_POMODORO";

const SET_CURRENT_DAY = "SET_CURRENT_DAY";
const SET_CURRENT_WEEK = "SET_CURRENT_WEEK";

export const addTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: ADD_TASK,
  task,
});

export const updateTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: UPDATE_TASK,
  task,
});

export const removeTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: REMOVE_TASK,
  task,
});

export const moveTaskBefore: ActionCreator<AnyAction> = (
  taskId: string,
  beforeTaskId: string
) => ({
  type: MOVE_TASK_BEFORE,
  taskId,
  beforeTaskId,
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

  action.task.pomodori = action.task.pomodori + pomodori;
  if (action.task.pomodori < 1) {
    action.task.pomodori = 1;
  }

  if (action.task.pomodori > 0) {
    return update(action, state)
  } else {
    return state;
  }
};

const moveBefore = (taskId: string, beforeTaskId: string, state = initialState ) => {

  const index = state.tasks.findIndex((task) => task.id === taskId);
  const destinationIndex = state.tasks.findIndex(
    (task) => task.id === beforeTaskId
  );

  const cloneTasks = [...state.tasks];
  cloneTasks.splice(destinationIndex, 0, cloneTasks.splice(index, 1)[0]);

  return {
    ...state,
    tasks: cloneTasks,
  };
};

const update = (action: AnyAction, state = initialState) => {
  const index = state.tasks.findIndex((task) => action.task.id === task.id);
  if (index !== -1) {
    return {
      ...state,
      tasks: state.tasks
        .slice(0, index)
        .concat(action.task)
        .concat(state.tasks.slice(index + 1, state.tasks.length)),
    };
  } else {
    return state
  }
};

const remove = (action: AnyAction, state = initialState) => {
  const index = state.tasks.findIndex((task) => task.id === action.task.id);

  const cloneTasks = [...state.tasks];
  cloneTasks.splice(index, 1);
  return {
    ...state,
    tasks: cloneTasks,
  };
};

export const rootReducer: Reducer<RootState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TASK:
      // initialize new task and put it to the end of the tasks array
      action.task.no = state.tasks.length + 1;
      action.task.pomodori = 1;
      action.task.status = ETaskStatus.NOT_STARTED;

      return {
        ...state,
        tasks: state.tasks.concat(action.task),
      };
    case UPDATE_TASK:
      return update(action, state);
    case REMOVE_TASK:
      return remove(action, state);
    case MOVE_TASK_BEFORE:
      return moveBefore(action.taskId, action.beforeTaskId, state);
    case ADD_TASK_POMODORO:
      return updatePomodori(1, action, state);
    case REMOVE_TASK_POMODORO:
      return updatePomodori(-1, action, state);
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
