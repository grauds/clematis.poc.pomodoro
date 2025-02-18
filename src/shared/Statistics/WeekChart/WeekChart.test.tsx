import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

import { WeekChart } from './WeekChart';
import { RootState, setCurrentDay } from '../../../store/reducer';
import {
  defaultSettings,
  ETheme,
  IDayStats,
  IWeek,
} from '../../../types/model';
import { getAnotherDay, getPreviousMonday } from '@/utils/time';

const mockStore = configureStore([]);

describe('WeekChart', () => {
  let store: ReturnType<typeof mockStore>;
  let initialState: RootState;

  beforeEach(() => {
    const monday = getPreviousMonday(new Date());
    initialState = {
      day: {
        date: new Date('2023-10-01'),
        short: 'Sun',
        time: 0,
        pause: 0,
        break: 0,
        stops: 0,
        name: '',
      } as IDayStats,
      week: {
        start: monday,
        end: getAnotherDay(monday, 7),
        id: '1',
        text: '',
      } as IWeek,
      stats: [
        {
          date: getAnotherDay(monday, -1),
          short: 'Sun',
          time: 120,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Воскресенье',
        },
        {
          date: monday,
          short: 'Пн',
          time: 150,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Понедельник',
        },
        {
          date: getAnotherDay(monday, 1),
          short: 'Tue',
          time: 90,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Вторник',
        },
        {
          date: getAnotherDay(monday, 2),
          short: 'Wed',
          time: 60,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Среда',
        },
        {
          date: getAnotherDay(monday, 3),
          short: 'Thu',
          time: 30,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Четверг',
        },
        {
          date: getAnotherDay(monday, 4),
          short: 'Fri',
          time: 180,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Пятница',
        },
        {
          date: getAnotherDay(monday, 5),
          short: 'Sat',
          time: 210,
          pause: 0,
          break: 0,
          stops: 0,
          name: 'Суббота',
        },
      ] as IDayStats[],
      info: true,
      theme: ETheme.LIGHT,
      tasks: [],
      settings: defaultSettings, 
    };

    store = mockStore(initialState);
  });

  it('renders WeekChart component', () => {
    render(
      <Provider store={store}>
        <WeekChart />
      </Provider>,
    );

    expect(screen.getByText('Вс')).toBeInTheDocument();
    expect(screen.getByText('Пн')).toBeInTheDocument();
    expect(screen.getByText('Вт')).toBeInTheDocument();
    expect(screen.getByText('Ср')).toBeInTheDocument();
    expect(screen.getByText('Чт')).toBeInTheDocument();
    expect(screen.getByText('Пт')).toBeInTheDocument();
    expect(screen.getByText('Сб')).toBeInTheDocument();
  });

  it('dispatches setCurrentDay action when a day is clicked', () => {
    render(
      <Provider store={store}>
        <WeekChart />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Пн'));

    const actions = store.getActions();
    expect(actions).toEqual([setCurrentDay(initialState.stats[1])]);
  });

  it('renders horizontal lines with correct times', () => {
    render(
      <Provider store={store}>
        <WeekChart />
      </Provider>,
    );

    expect(screen.getByText('42 сек')).toBeInTheDocument();
    expect(screen.getByText('1 мин 24 сек')).toBeInTheDocument();
    expect(screen.getByText('2 мин 6 сек')).toBeInTheDocument();
    expect(screen.getByText('2 мин 48 сек')).toBeInTheDocument();
  });
});
