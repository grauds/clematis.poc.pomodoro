import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { EPomodoroStatus, ETaskStatus, ITask } from '@/types/model';
import '@testing-library/jest-dom';

import { Task } from './Task';
import { addTask, addTaskPomodoro, removeTaskPomodoro } from '@/store/reducer';

const mockStore = configureStore([]);
const noop = () => {};

const task: ITask = {
  id: '1',
  name: 'Test Task',
  no: 1,
  status: ETaskStatus.IN_PROGRESS,
  pomodori: [
    {
      id: 1,
      status: EPomodoroStatus.IN_PROGRESS,
      seconds: 1500,
      breakSeconds: 300,
      time: new Date().getTime(),
      pause: 0,
      break: 0,
    },
  ],
};

const initialState = {
  tasks: [task],
};

describe('Task Component', () => {
  let store: ReturnType<typeof mockStore>;

  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal_root');
  document.body.appendChild(modalRoot);

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders task component', () => {
    render(
      <Provider store={store}>
        <Task
          task={task}
          draggedOver={false}
          dragEnter={noop}
          dragLeave={noop}
          dragStart={noop}
          dragEnd={noop}
        />
      </Provider>,
    );

    expect(screen.getByText((content, element) => content.startsWith('Test Task'))).toBeInTheDocument();
  });

  it('displays the correct number of pomodori', () => {
    render(
      <Provider store={store}>
        <Task
          task={task}
          draggedOver={false}
          dragEnter={noop}
          dragLeave={noop}
          dragStart={noop}
          dragEnd={noop}
        />
      </Provider>,
    );

    expect(screen.getByText((content, element) => content.includes('🍅'))).toBeInTheDocument();
  });

  it('opens rename dialog when rename menu item is clicked', () => {
    render(
      <Provider store={store}>
        <Task
          task={task}
          draggedOver={false}
          dragEnter={noop}
          dragLeave={noop}
          dragStart={noop}
          dragEnd={noop}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByLabelText('menuButton'));
    fireEvent.click(screen.getByText((content, element) => content.startsWith('Переименовать')));
    expect(screen.getByText('Имя задачи')).toBeInTheDocument();
  });

  it('opens delete confirmation dialog when delete menu item is clicked', () => {
    render(
      <Provider store={store}>
        <Task
          task={task}
          draggedOver={false}
          dragEnter={noop}
          dragLeave={noop}
          dragStart={noop}
          dragEnd={noop}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByLabelText('menuButton'));
    fireEvent.click(screen.getByText((content, element) => content.startsWith('Удалить')));
    expect(screen.getByText('Удалить задачу?')).toBeInTheDocument();
  });

  it('dispatches addTaskPomodoro action when increase pomodoro menu item is clicked', () => {
    render(
      <Provider store={store}>
        <Task
          task={task}
          draggedOver={false}
          dragEnter={noop}
          dragLeave={noop}
          dragStart={noop}
          dragEnd={noop}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByLabelText('menuButton'));
    fireEvent.click(screen.getByText((content, element) => content.startsWith('Увеличить')));
    const actions = store.getActions();
    expect(actions).toContainEqual(addTaskPomodoro(task));
  });

  it('dispatches removeTaskPomodoro action when decrease pomodoro menu item is clicked', () => {
    render(
      <Provider store={store}>
        <Task
          task={task}
          draggedOver={false}
          dragEnter={noop}
          dragLeave={noop}
          dragStart={noop}
          dragEnd={noop}
        />
      </Provider>,
    );

    
    fireEvent.click(screen.getByLabelText('menuButton'));
    fireEvent.click(screen.getByText((content, element) => content.startsWith('Уменьшить')));
    const actions = store.getActions();
    expect(actions).toContainEqual(removeTaskPomodoro(task));
  });
});
