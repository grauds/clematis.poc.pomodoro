import React from "react";
import {mount } from "enzyme";
import { CounterContainer } from "../CounterContainer";
import {createStore} from "redux";
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";

import {initialState, rootReducer} from "../../../../store/reducer";

const store = createStore(
    rootReducer,
    initialState
);

describe("Counter container", () => {
  test("should render", () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CounterContainer/>
          </MemoryRouter>
        </Provider>);
    expect(wrapper).toBeDefined();
    console.log(wrapper.find("div.container").debug());    
  });
});
