import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { initialState, rootReducer } from '@/store/reducer';
import { createStore } from 'redux';

import { Header } from '../Header';

import { render } from '@testing-library/react';

const store = createStore(rootReducer, initialState);
describe('Header', () => {
  test('should render', () => {
    const {container}= render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
