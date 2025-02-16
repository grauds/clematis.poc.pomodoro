import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Store, AnyAction } from 'redux';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Main } from './Main';
import { RootState } from '@/store/reducer';
import {
  defaultSettings,
  ETaskStatus,
  ETheme,
  newCurrentDayStats,
  Weeks,
} from '@/types/model';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const initialState: RootState = {
  theme: ETheme.LIGHT,
  tasks: [],
  day: newCurrentDayStats(), // selected day of week default value is current day
  week: Weeks[0], // selected week default value is current week (the top most)
  stats: [], // a list of actual days user worked with the timer, no longer than two weeks back in time
  settings: defaultSettings, // system settings
  info: true,
};

describe('Main component', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('renders the main heading', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    expect(screen.getByText('Ура, можно начать работать!')).toBeInTheDocument();
  });

  test('toggles info section visibility', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    const toggleButton = screen.getByText('Спрятать помощь');
    fireEvent.click(toggleButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      "info": false,
      "type": "TOGGLE_INFO",
    });
  });

  test('adds a new task', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Название задачи');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      task: {
        id: expect.any(String),
        name: 'New Task',
        status: ETaskStatus.NOT_STARTED,
        pomodori: [],
      },
    });
  });
});
