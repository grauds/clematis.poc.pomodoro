import React from 'react';
import { CounterContainer } from '../CounterContainer';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState, rootReducer } from '@/store/reducer';

import { render } from '@testing-library/react';

describe('Counter container', () => {
  test('should render', () => {
    const store = createStore(rootReducer, initialState);

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CounterContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
