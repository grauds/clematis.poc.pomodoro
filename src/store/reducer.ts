import { Reducer } from "redux";

export type RootState = {
  
};

const initialState: RootState = {

};


export const rootReducer: Reducer<RootState> = (
  state = initialState,
  action
) => {
  switch (action.type) {

    default:
      return state;
  }
};
