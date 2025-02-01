import React from 'react';
import { mount } from 'enzyme';
import { CounterContainer } from '../CounterContainer';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState, rootReducer } from '../../../../store/reducer';

describe('Counter container', () => {
  test('should render', () => {
    const store = createStore(rootReducer, initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CounterContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
