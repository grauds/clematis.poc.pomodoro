import { ActionCreator, AnyAction, Reducer } from 'redux';
import {
  ETaskStatus,
  ETheme,
  IDay,
  IDayStats,
  IPomodoro,
  ISettings,
  ITask,
  IWeek,
  Weeks,
  defaultSettings,
  findDayStats,
  freshPomodoro,
  longBreakFreshPomodoro,
  newCurrentDayStats,
} from '@/types/model';
import { sameDay } from '@/utils/time';

export type RootState = {
  info: boolean;
  theme: ETheme;
  tasks: ITask[]; // tasks list
  day: IDayStats; // selected day of week
  week: IWeek; // selected week
  stats: IDayStats[]; // stats list
  settings: ISettings; // customized settings
};

export const initialState: RootState = {
  theme: ETheme.LIGHT,
  tasks: [],
  day: newCurrentDayStats(), // selected day of week default value is current day
  week: Weeks[0], // selected week default value is current week (the top most)
  stats: [], // a list of actual days user worked with the timer, no longer than two weeks back in time
  settings: defaultSettings, // system settings
  info: true,
};

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const MOVE_TASK_BEFORE = 'MOVE_TASK_BEFORE';

export const UPDATE_DAY_STATS = 'UPDATE_DAY_STATS';

export const ADD_TASK_POMODORO = 'ADD_TASK_POMODORO';
export const UPDATE_TASK_POMODORO = 'UPDATE_TASK_POMODORO';
export const REMOVE_TASK_POMODORO = 'REMOVE_TASK_POMODORO';

export const SET_CURRENT_DAY = 'SET_CURRENT_DAY';
export const SET_CURRENT_WEEK = 'SET_CURRENT_WEEK';

export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const TOGGLE_INFO = 'TOGGLE_INFO';

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
  beforeTaskId: string,
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
  pomodoro: IPomodoro,
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
  dayStats: IDayStats,
) => ({
  type: UPDATE_DAY_STATS,
  dayStats,
});

export const updateSettings: ActionCreator<AnyAction> = (
  settings: ISettings,
) => ({
  type: UPDATE_SETTINGS,
  settings,
});

const moveBefore = (
  taskId: string,
  beforeTaskId: string,
  state = initialState,
) => {
  const index = state.tasks.findIndex((task) => task.id === taskId);
  const destinationIndex = state.tasks.findIndex(
    (task) => task.id === beforeTaskId,
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
  state = initialState,
) => {
  const _pomodori: IPomodoro[] = [...action.task.pomodori];
  if (pomodori > 0) {
    for (let i = 0; i < pomodori; i++) {
      _pomodori.push({
        ...((_pomodori.length + 1) % state.settings.longBreakAfterPomodoro === 0
          ? longBreakFreshPomodoro(_pomodori.length + 1, state.settings)
          : freshPomodoro(_pomodori.length + 1, state.settings)),
      });
    }
    action.task.status = ETaskStatus.NOT_STARTED;
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
  const dayStats: IDayStats | undefined = findDayStats(
    state.stats,
    action.dayStats.date,
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

export const toggleInfo: ActionCreator<AnyAction> = (info: boolean) => ({
  type: TOGGLE_INFO,
  info,
});

export const updateTheme: ActionCreator<AnyAction> = (theme: ETheme) => ({
  type: UPDATE_THEME,
  theme,
});

export const rootReducer: Reducer<RootState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_TASK:
      // initialize new task and put it to the end of the tasks array
      action.task.no = state.tasks.length + 1;
      action.task.pomodori.push(freshPomodoro(1, state.settings));
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

    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: action.settings,
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

    case TOGGLE_INFO:
      return {
        ...state,
        info: action.info,
      };

    case UPDATE_THEME:
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
};
