import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import alarmSound from './../../sound/alarm-kitchen.mp3';
import tickingSound from './../../sound/check.mp3';
import notificationSound from './../../sound/notification.mp3';

import {
  RootState,
  updateDayStats,
  updateTask,
  updateTaskPomodoro,
} from '@/store/reducer';
import {
  EPomodoroStatus,
  ETaskStatus,
  IDayStats,
  IPomodoro,
  ISettings,
  ITask,
  freshPomodoro,
  getDayStats,
} from '@/types/model';

import { Counter, ICounterProps } from '../Counter';
import { noop } from '@/utils/noop';

export function CounterContainer(): React.JSX.Element {
  // current task reference
  const currentTask = useSelector<RootState, ITask | undefined>((state) =>
    state.tasks.length > 0 ? state.tasks[0] : undefined,
  );

  // get next pomodoro
  let currentPomodoro: IPomodoro | undefined = currentTask?.pomodori.find(
    (pomodoro: IPomodoro) => {
      return pomodoro.status !== EPomodoroStatus.DONE;
    },
  );

  // current day stats reference
  const stats: IDayStats[] = useSelector<RootState, IDayStats[]>(
    (state) => state.stats,
  );
  const dayStats: IDayStats = getDayStats(stats, new Date());

  // current settings reference
  const settings: ISettings = useSelector<RootState, ISettings>(
    (state) => state.settings,
  );

  const seconds = currentPomodoro ? currentPomodoro.seconds : 0;
  const breakSeconds = currentPomodoro ? currentPomodoro.breakSeconds : 0;

  const isTaskRunning = currentPomodoro?.status === EPomodoroStatus.RUNNING;
  const isPause = currentPomodoro?.status === EPomodoroStatus.PAUSED;
  const isBreakRunning =
    currentPomodoro?.status === EPomodoroStatus.BREAK_RUNNING;

  const dispatch = useDispatch();
  const [alarm] = useSound(alarmSound);
  const [ticking] = useSound(tickingSound);
  const [notification] = useSound(notificationSound);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentPomodoro) {
        if (
          (isTaskRunning && seconds > 0) ||
          (isBreakRunning && breakSeconds > 0)
        ) {
          if (isTaskRunning) {
            //     if (settings.soundOn) ticking();
            currentPomodoro.seconds -= 1;
            currentPomodoro.time += 1;
            dayStats.time += 1;
          } else if (isBreakRunning) {
            currentPomodoro.breakSeconds -= 1;
            currentPomodoro.break += 1;
            dayStats.break += 1;
          }
          dispatch(updateTaskPomodoro(currentPomodoro));
          dispatch(updateDayStats(dayStats));
        }
        if (isTaskRunning && seconds === 0) {
          currentPomodoro.status = EPomodoroStatus.BREAK_RUNNING;
          if (settings.soundOn) alarm();
          dispatch(updateTaskPomodoro(currentPomodoro));
        }
        if (isBreakRunning && breakSeconds === 0) {
          finishPomodoroOrTask();
        }
        if (isPause) {
          currentPomodoro.pause += 1;
          dayStats.pause += 1;
          dispatch(updateTaskPomodoro(currentPomodoro));
          dispatch(updateDayStats(dayStats));
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTask]);

  function startTimer() {
    if (currentTask && currentPomodoro) {
      currentPomodoro.status = EPomodoroStatus.RUNNING;
      currentTask.status = ETaskStatus.RUNNING;
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }

  function pauseTimer() {
    if (currentTask && currentPomodoro) {
      currentPomodoro.status = EPomodoroStatus.PAUSED;
      currentTask.status = ETaskStatus.PAUSED;
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }

  function pauseBreakTimer() {
    if (currentTask && currentPomodoro) {
      currentPomodoro.status = EPomodoroStatus.BREAK_PAUSED;
      currentTask.status = ETaskStatus.PAUSED;
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }

  function stopTimer() {
    if (currentTask && currentPomodoro) {
      currentPomodoro = {
        ...freshPomodoro(currentPomodoro.id, settings),
      };
      dayStats.stops += 1;
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
      dispatch(updateDayStats(dayStats));
    }
  }

  function startBreakTimer() {
    if (currentTask && currentPomodoro) {
      currentPomodoro.status = EPomodoroStatus.BREAK_RUNNING;
      currentTask.status = ETaskStatus.RUNNING;
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }

  function finishPomodoroOrTask() {
    if (currentTask && currentPomodoro) {
      currentPomodoro.status = EPomodoroStatus.DONE;
      currentPomodoro.date = new Date();
      currentTask.status =
        currentTask.pomodori.length !== currentPomodoro.id
          ? ETaskStatus.PAUSED
          : ETaskStatus.DONE;
      if (settings.soundOn) notification();
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }

  const empty: ICounterProps = {
    active: false,
    name: 'Задача не выбрана',
    status: 'Ожидание',
    pomodoroNo: 0,
    titleCss: '',
    seconds: 0,
    secondsCss: '',
    bodyCss: '',
    leftButtonTitle: '',
    leftButtonAction: noop,
    rightButtonTitle: '',
    rightBuittonAction: noop,
    rightButtonDisabled: false,
    handleTimeAdd: noop,
  };

  const notStarted: ICounterProps = {
    active: true,
    name: currentTask ? currentTask.name : 'без имени',
    status: 'Не начато',
    pomodoroNo: currentPomodoro ? currentPomodoro.id : 0,
    seconds: currentPomodoro ? currentPomodoro.seconds : 0,
    titleCss: '',
    secondsCss: '',
    bodyCss: '',
    leftButtonTitle: 'Старт',
    leftButtonAction: startTimer,
    rightButtonTitle: 'Стоп',
    rightBuittonAction: noop,
    rightButtonDisabled: true,
    handleTimeAdd: () => {
      if (currentPomodoro && currentPomodoro.seconds > 0) {
        currentPomodoro.seconds += 60;
        dispatch(updateTaskPomodoro(currentPomodoro));
      }
    },
  };

  const pauseWork: ICounterProps = {
    ...notStarted,
    status: 'Выполняется',
    titleCss: 'running',
    secondsCss: 'running',
    bodyCss: 'running',
    leftButtonTitle: 'Пауза',
    leftButtonAction: pauseTimer,
    rightButtonTitle: 'Стоп',
    rightBuittonAction: stopTimer,
    rightButtonDisabled: false,
  };

  const afterPause: ICounterProps = {
    ...pauseWork,
    status: 'На паузе',
    leftButtonTitle: 'Продолжить',
    leftButtonAction: startTimer,
    rightButtonTitle: 'Сделано',
    rightBuittonAction: finishPomodoroOrTask,
  };

  const pauseBreak: ICounterProps = {
    ...notStarted,
    status: 'Отдых',
    seconds: currentPomodoro ? currentPomodoro.breakSeconds : 0,
    titleCss: 'breakRunning',
    secondsCss: 'breakRunning',
    bodyCss: 'breakRunning',
    leftButtonTitle: 'Пауза',
    leftButtonAction: pauseBreakTimer,
    rightButtonTitle: 'Пропустить',
    rightBuittonAction: finishPomodoroOrTask,
    rightButtonDisabled: false,
    handleTimeAdd: () => {
      if (currentPomodoro) {
        currentPomodoro.breakSeconds += 60;
        dispatch(updateTaskPomodoro(currentPomodoro));
      }
    },
  };

  const afterBreakPause: ICounterProps = {
    ...pauseBreak,
    status: 'Отдых на паузе',
    leftButtonTitle: 'Продолжить',
    leftButtonAction: startBreakTimer,
  };

  let counterProps: ICounterProps = empty;

  switch (currentPomodoro?.status) {
    case EPomodoroStatus.NOT_STARTED:
      counterProps = notStarted;
      break;
    case EPomodoroStatus.RUNNING:
      counterProps = pauseWork;
      break;
    case EPomodoroStatus.PAUSED:
      counterProps = afterPause;
      break;
    case EPomodoroStatus.BREAK_RUNNING:
      counterProps = pauseBreak;
      break;
    case EPomodoroStatus.BREAK_PAUSED:
      counterProps = afterBreakPause;
      break;
    case EPomodoroStatus.DONE:
      counterProps = empty;
      break;
  }

  return <Counter {...counterProps} />;
}
