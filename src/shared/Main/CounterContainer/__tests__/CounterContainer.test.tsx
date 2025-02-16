import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { CounterContainer } from '../CounterContainer';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState, rootReducer } from '@/store/reducer';
import { EPomodoroStatus, ETaskStatus } from '@/types/model';

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

  test('should start timer', () => {
    const store = createStore(rootReducer, {
      ...initialState,
      tasks: [
        {
          id: '1',
          name: 'Test Task',
          status: ETaskStatus.NOT_STARTED,
          pomodori: [
            {
              id: 1,
              status: EPomodoroStatus.NOT_STARTED,
              seconds: 1500,
              breakSeconds: 300,
              time: 0,
              break: 0,
              pause: 0,
            },
          ],
          no: 1
        },
      ],
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CounterContainer />
        </MemoryRouter>
      </Provider>,
    );

    const startButton = getByText('Старт');
    fireEvent.click(startButton);

    const state = store.getState();
    expect(state.tasks[0].status).toBe(ETaskStatus.RUNNING);
    expect(state.tasks[0].pomodori[0].status).toBe(EPomodoroStatus.RUNNING);
  });

  test('should pause timer', () => {
    const store = createStore(rootReducer, {
      ...initialState,
      tasks: [
        {
          id: '1',
          name: 'Test Task',
          status: ETaskStatus.RUNNING,
          pomodori: [
            {
              id: 1,
              status: EPomodoroStatus.RUNNING,
              seconds: 1500,
              breakSeconds: 300,
              time: 0,
              break: 0,
              pause: 0,
            },
          ],
          no: 1
        },
      ],
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CounterContainer />
        </MemoryRouter>
      </Provider>,
    );

    const pauseButton = getByText('Пауза');
    fireEvent.click(pauseButton);

    const state = store.getState();
    expect(state.tasks[0].status).toBe(ETaskStatus.PAUSED);
    expect(state.tasks[0].pomodori[0].status).toBe(EPomodoroStatus.PAUSED);
  });

  test('should stop timer', () => {
    const store = createStore(rootReducer, {
      ...initialState,
      tasks: [
        {
          id: '1',
          name: 'Test Task',
          status: ETaskStatus.RUNNING,
          pomodori: [
            {
              id: 1,
              status: EPomodoroStatus.RUNNING,
              seconds: 1500,
              breakSeconds: 300,
              time: 0,
              break: 0,
              pause: 0,
            },
          ],
          no: 1
        },
      ],
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CounterContainer />
        </MemoryRouter>
      </Provider>,
    );

    const stopButton = getByText('Стоп');
    fireEvent.click(stopButton);

    const state = store.getState();
    expect(state.tasks[0].status).toBe(ETaskStatus.RUNNING);
    expect(state.tasks[0].pomodori[0].status).toBe(EPomodoroStatus.NOT_STARTED);
  });

  test('should handle timer countdown', () => {
    jest.useFakeTimers();
    const store = createStore(rootReducer, {
      ...initialState,
      tasks: [
        {
          id: '1',
          name: 'Test Task',
          status: ETaskStatus.RUNNING,
          pomodori: [
            {
              id: 1,
              status: EPomodoroStatus.RUNNING,
              seconds: 1500,
              breakSeconds: 300,
              time: 0,
              break: 0,
              pause: 0,
            },
          ],
          no: 1
        },
      ],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CounterContainer />
        </MemoryRouter>
      </Provider>,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const state = store.getState();
    expect(state.tasks[0].pomodori[0].seconds).toBe(1499);
    jest.useRealTimers();
  });
});
