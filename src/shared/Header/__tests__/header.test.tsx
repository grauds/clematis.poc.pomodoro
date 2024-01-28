import {mount} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {initialState, rootReducer} from "../../../store/reducer";
import {createStore} from "redux";

import {Header} from "../Header";

const store = createStore(
    rootReducer,
    initialState
);
describe("Header", () => {
    test("should render", () => {
        const wrapper = mount(<Provider store={store}>
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        </Provider>);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });
});
