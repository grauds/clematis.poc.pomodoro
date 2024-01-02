import { ActionCreator, AnyAction, Reducer } from "redux";
import { ITask } from "../types/model";

export type RootState = {
  tasks: ITask[]
};

const initialState: RootState = {
  tasks: []
};

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";

export const addTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: ADD_TASK,
  task,
});

export const removeTask: ActionCreator<AnyAction> = (task: ITask) => ({
  type: REMOVE_TASK,
  task,
});

export const rootReducer: Reducer<RootState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(action.task)
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.indexOf(action.task) !== -1 ? state.tasks.splice(action.task, 1) : state.tasks
      };  
    default:
      return state;
  }
};
