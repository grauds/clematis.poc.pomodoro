import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootState,
  updateTask,
  updateTaskPomodoro,
} from "../../../store/reducer";
import {
  EPomodoroStatus,
  ETaskStatus,
  IPomodoro,
  ITask,
  freshPomodoro,
} from "../../../types/model";

import { Counter, ICounterProps } from "../Counter/Counter";
import { noop } from "../../../utils/noop";


export function CounterContainer() {

  // current task reference
  const currentTask = useSelector<RootState, ITask | undefined>((state) =>
    state.tasks.length > 0 ? state.tasks[0] : undefined
  );

  // get next pomodoro
  let currentPomodoro: IPomodoro | undefined = currentTask?.pomodori.find(
    (pomodoro: IPomodoro) => {
      return pomodoro.status !== EPomodoroStatus.DONE;
    }
  );

  const seconds = currentPomodoro ? currentPomodoro.seconds : 0;
  const breakSeconds = currentPomodoro ? currentPomodoro.breakSeconds : 0;

  const isTaskRunning = currentPomodoro?.status === EPomodoroStatus.RUNNING;
  const isPause = currentPomodoro?.status === EPomodoroStatus.PAUSED;
  const isBreakRunning = currentPomodoro?.status === EPomodoroStatus.BREAK_RUNNING;

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentPomodoro) {
        if (
          (isTaskRunning && seconds > 0) ||
          (isBreakRunning && breakSeconds > 0)
        ) {
          if (isTaskRunning) {
            currentPomodoro.seconds -= 1;
            currentPomodoro.time += 1;
          } else if (isBreakRunning) {
            currentPomodoro.breakSeconds -= 1;
            currentPomodoro.break += 1;
          }
          dispatch(updateTaskPomodoro(currentPomodoro));
        }
        if (isTaskRunning && seconds === 0) {
          currentPomodoro.status = EPomodoroStatus.BREAK_RUNNING;
          dispatch(updateTaskPomodoro(currentPomodoro));
        }
        if (isBreakRunning && breakSeconds === 0) {
          finishPomodoroOrTask() 
        }
        if (isPause) {
          currentPomodoro.pause += 1;
          dispatch(updateTaskPomodoro(currentPomodoro));
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
        id: currentPomodoro.id,
        ...freshPomodoro,
      };
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }

  function finishPomodoro() {
    if (currentTask && currentPomodoro) {
      currentPomodoro.status = EPomodoroStatus.DONE;
      currentTask.status = ETaskStatus.PAUSED
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
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
      currentTask.status =
        currentTask.pomodori.length !== currentPomodoro.id
          ? ETaskStatus.PAUSED
          : ETaskStatus.DONE;
      dispatch(updateTaskPomodoro(currentPomodoro));
      dispatch(updateTask(currentTask));
    }
  }


  const empty: ICounterProps =  {
    active: false,
    name: '',
    pomodoroNo: 0,
    titleCss: '',
    seconds: 0,
    secondsCss: "",
    bodyCss: "",
    leftButtonTitle: "",
    leftButtonAction: noop,
    rightButtonTitle: "",
    rightBuittonAction: noop,
    rightButtonDisabled: false,
    handleTimeAdd: noop
  }

  const notStarted: ICounterProps =  {
    active: true,
    name: currentTask ? currentTask.name : 'Без имени',
    pomodoroNo: currentPomodoro ? currentPomodoro.id : 0,
    seconds: currentPomodoro ? currentPomodoro.seconds : 0,
    titleCss: '',
    secondsCss: '',
    bodyCss: '',
    leftButtonTitle: "Старт",
    leftButtonAction: startTimer,
    rightButtonTitle: "Стоп",
    rightBuittonAction: noop,
    rightButtonDisabled: true,
    handleTimeAdd: () => {
      if (currentPomodoro && currentPomodoro.seconds > 0) {
          currentPomodoro.seconds += 60;
          dispatch(updateTaskPomodoro(currentPomodoro));
      }
    }
  }

  const pauseWork: ICounterProps =  {
    ...notStarted,
    titleCss: 'running',
    secondsCss: 'running',
    bodyCss: 'running',
    leftButtonTitle: "Пауза",
    leftButtonAction: pauseTimer,
    rightButtonTitle: "Стоп",
    rightBuittonAction: stopTimer,
    rightButtonDisabled: false
  }

  const afterPause: ICounterProps = {
    ...pauseWork,
    leftButtonTitle: "Продолжить",
    leftButtonAction: startTimer,
    rightButtonTitle: "Сделано",
    rightBuittonAction: finishPomodoroOrTask
  }

  const pauseBreak: ICounterProps =  {
    ...notStarted,
    seconds: currentPomodoro ? currentPomodoro.breakSeconds : 0,
    titleCss: 'breakRunning',
    secondsCss: 'breakRunning',
    bodyCss: 'breakRunning',
    leftButtonTitle: "Пауза",
    leftButtonAction: pauseBreakTimer,
    rightButtonTitle: "Пропустить",
    rightBuittonAction: finishPomodoroOrTask,
    rightButtonDisabled: false,
    handleTimeAdd: () => {
      if (currentPomodoro) {
          currentPomodoro.breakSeconds += 60;
          dispatch(updateTaskPomodoro(currentPomodoro));
      }
    }
  }

  const afterBreakPause: ICounterProps = {
    ...pauseBreak,
    leftButtonTitle: "Продолжить",
    leftButtonAction: startBreakTimer,
  }

  let counterProps: ICounterProps = empty

  switch (currentPomodoro?.status) {
    case EPomodoroStatus.NOT_STARTED:
      counterProps = notStarted
      break;
    case EPomodoroStatus.RUNNING:
      counterProps = pauseWork
      break;
    case EPomodoroStatus.PAUSED:
      counterProps = afterPause
      break;
    case EPomodoroStatus.BREAK_RUNNING:
      counterProps = pauseBreak
      break;
    case EPomodoroStatus.BREAK_PAUSED:
      counterProps = afterBreakPause
      break;
    case EPomodoroStatus.DONE:
      counterProps = empty
      break;   
  }

  return (
     <Counter {...counterProps} />
  );
}
