import { ActionCreator, AnyAction, Reducer } from "redux";
import { Days, EPomodoroStatus, IDay, IPomodoro, ITask, IWeek, Weeks } from "../types/model";

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

export const freshPomodoro = {  
  seconds: 20,
  breakSeconds: 10,
  time: 0,
  pause: 0,
  break: 0,
  status: EPomodoroStatus.NOT_STARTED
}

export const longBreakFreshPomodoro = {
  ...freshPomodoro,
  breakSeconds: 20 * 60
}

const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const MOVE_TASK_BEFORE = "MOVE_TASK_BEFORE";

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

export const updateTaskPomodoro: ActionCreator<AnyAction> = (pomodoro: IPomodoro) => ({
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

const update = (task: ITask, state = initialState) => {
  return {
    ...state,
    tasks: state.tasks.map((item) => {
      if (item.id !== task.id) {
        return item
      }
      return {
        ...item,
        ...task
      }
    })
  }  
};

const remove = (action: AnyAction, state = initialState) => {
  return {
    ...state,
    tasks: state.tasks.filter((task) => {
      return action.task.id !== task.id
    })
  };
};

const updatePomodoro = (action: AnyAction, state = initialState) => {

  // take the currently running task, other tasks' pomodori are not updated
  if (state.tasks.length < 1) {
    return state
  }
  
  const task: ITask = state.tasks[0];
  task.pomodori = task.pomodori.map((pomodoro) => {
    if (action.pomodoro.id !== pomodoro.id) {
      return pomodoro
    }
    return {
      ...pomodoro,
      ...action.pomodoro
    }
  });  

  return update(task, state)
}

const updatePomodori = (pomodori: number, action: AnyAction, state = initialState) => {

  const _pomodori: IPomodoro[] = [...action.task.pomodori];
  if (pomodori > 0) {
    for (let i = 0; i < pomodori; i++) {
      _pomodori.push({
        id: _pomodori.length + 1,
        ...freshPomodoro
      });  
    }
  } else if (pomodori < 0 && (Math.abs(pomodori) < _pomodori.length)) {
    _pomodori.splice(_pomodori.length - Math.abs(pomodori), Math.abs(pomodori))
  }

  action.task.pomodori = _pomodori

  if (action.task.pomodori.length > 0) {
    return update(action.task, state)
  } else {
    return state;
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
        ...freshPomodoro
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
