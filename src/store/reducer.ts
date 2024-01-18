import { ActionCreator, AnyAction, Reducer } from "redux";
import {
  IDay,
  IDayStats,
  IPomodoro,
  ITask,
  IWeek,
  Weeks,
  freshPomodoro,
  getDayStats,
  newCurrentDayStats,
} from "../types/model";
import { sameDay } from "../utils/time";

export type RootState = {
  tasks: ITask[]; // tasks list
  day: IDayStats; // selected day of week
  week: IWeek; // selected week
  stats: IDayStats[]; // stats list
};

export const initialState: RootState = {
  tasks: [],
  day: newCurrentDayStats(), // selected day of week default value is current day
  week: Weeks[0], // selected week default value is current week (the top most)
  stats: [], // a list of actual days user worked with the timer, no longer than two weeks back in time
};

const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const MOVE_TASK_BEFORE = "MOVE_TASK_BEFORE";

const UPDATE_DAY_STATS = "UPDATE_DAY_STATS";

const ADD_TASK_POMODORO = "ADD_TASK_POMODORO";
const UPDATE_TASK_POMODORO = "UPDATE_TASK_POMODORO";
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

export const updateTaskPomodoro: ActionCreator<AnyAction> = (
  pomodoro: IPomodoro
) => ({
  type: UPDATE_TASK_POMODORO,
  pomodoro,
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

export const updateDayStats: ActionCreator<AnyAction> = (
  dayStats: IDayStats
) => ({
  type: UPDATE_DAY_STATS,
  dayStats,
});

const moveBefore = (
  taskId: string,
  beforeTaskId: string,
  state = initialState
) => {
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

const update = (task: ITask, state = initialState) => {
  return {
    ...state,
    tasks: state.tasks.map((item) => {
      if (item.id !== task.id) {
        return item;
      }
      return {
        ...item,
        ...task,
      };
    }),
  };
};

const remove = (action: AnyAction, state = initialState) => {
  return {
    ...state,
    tasks: state.tasks.filter((task) => {
      return action.task.id !== task.id;
    }),
  };
};

const updatePomodoro = (action: AnyAction, state = initialState) => {
  if (state.tasks.length < 1) {
    return state;
  }

  // take the currently running task, other tasks' pomodori are not updated
  const task: ITask = state.tasks[0];
  task.pomodori = task.pomodori.map((pomodoro) => {
    if (action.pomodoro.id !== pomodoro.id) {
      return pomodoro;
    }
    return {
      ...pomodoro,
      ...action.pomodoro,
    };
  });

  return update(task, state);
};

const updatePomodori = (
  pomodori: number,
  action: AnyAction,
  state = initialState
) => {
  const _pomodori: IPomodoro[] = [...action.task.pomodori];
  if (pomodori > 0) {
    for (let i = 0; i < pomodori; i++) {
      _pomodori.push({
        id: _pomodori.length + 1,
        ...freshPomodoro,
      });
    }
  } else if (pomodori < 0 && Math.abs(pomodori) < _pomodori.length) {
    _pomodori.splice(_pomodori.length - Math.abs(pomodori), Math.abs(pomodori));
  }

  action.task.pomodori = _pomodori;

  if (action.task.pomodori.length > 0) {
    return update(action.task, state);
  } else {
    return state;
  }
};

const updateStats = (action: AnyAction, state = initialState) => {
  const dayStats: IDayStats | undefined = getDayStats(
    state.stats,
    action.dayStats.date
  );

  if (dayStats) {
    return {
      ...state,
      stats: state.stats.map((day) => {
        if (!sameDay(day.date, action.dayStats.date)) {
          return day;
        }
        return {
          ...day,
          ...action.dayStats,
        };
      }),
    };
  } else {
    return {
      ...state,
      stats: state.stats.concat(action.dayStats),
    };
  }
};

export const rootReducer: Reducer<RootState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TASK:
      // initialize new task and put it to the end of the tasks array
      action.task.no = state.tasks.length + 1;
      action.task.pomodori.push({
        id: 1,
        ...freshPomodoro,
      });

      return {
        ...state,
        tasks: state.tasks.concat(action.task),
      };

    case UPDATE_TASK:
      return update(action.task, state);

    case REMOVE_TASK:
      return remove(action, state);

    case MOVE_TASK_BEFORE:
      return moveBefore(action.taskId, action.beforeTaskId, state);

    case ADD_TASK_POMODORO:
      return updatePomodori(1, action, state);

    case UPDATE_TASK_POMODORO:
      return updatePomodoro(action, state);

    case REMOVE_TASK_POMODORO:
      return updatePomodori(-1, action, state);

    case UPDATE_DAY_STATS:
      return updateStats(action, state);

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
