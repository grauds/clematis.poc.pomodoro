import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootState,
  freshPomodoro,
  updateTask,
  updateTaskPomodoro,
} from "../../../store/reducer";
import {
  EPomodoroStatus,
  ETaskStatus,
  IPomodoro,
  ITask,
} from "../../../types/model";
import { CounterHeader } from "./CounterHeader";
import { PlusBigIcon } from "../../icons";
import { formatTime } from "../../../utils/time";

import styles from "./counter.css";

export function Counter() {
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
  const isBreakRunning =
    currentPomodoro?.status === EPomodoroStatus.BREAK_RUNNING;

  const runningCss = isTaskRunning ? styles.running : "";
  const breakRunningCss = isTaskRunning ? styles.breakRunning : "";

  const dispatch = useDispatch();

  function handleClick() {
    if (currentPomodoro) {
      currentPomodoro.seconds += 60;
      dispatch(updateTaskPomodoro(currentPomodoro));
    }
  }

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
          currentPomodoro.status = EPomodoroStatus.DONE;
          dispatch(updateTaskPomodoro(currentPomodoro));
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

  function finishTask() {
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

  return (
    <div className={styles.counter}>
      <CounterHeader
        header={currentTask?.name}
        pomodoroNo={
          currentTask?.status === ETaskStatus.DONE ? 0 : currentPomodoro?.id
        }
        running={isTaskRunning || isPause}
      />
      {currentTask ? (
        <>
          <div className={`${styles.body} ${runningCss} ${breakRunningCss}`}>
            <span className={styles.placeholder}></span>
            <span className={runningCss}>{formatTime(seconds)}</span>
            <button onClick={handleClick}>
              <PlusBigIcon />
            </button>
          </div>
          <div className={styles.task}>
            <span className={styles.taskHeader}>Задача - </span>
            {currentTask?.name}
          </div>
          <div className={styles.controlBar}>
            <button
              className={styles.start}
              onClick={() => {
                if (isTaskRunning) {
                  pauseTimer();
                } else {
                  startTimer();
                }
              }}
            >
              {isTaskRunning ? "Пауза" : isPause ? "Продолжить" : "Старт"}
            </button>
            <button
              className={styles.stop}
              onClick={() => {
                if (isPause) {
                  finishTask();
                } else {
                  stopTimer();
                }
              }}
              disabled={!isTaskRunning && !isPause}
            >
              {isPause ? "Сделано" : "Стоп"}
            </button>
          </div>
        </>
      ) : (
        <span className={styles.body}></span>
      )}
    </div>
  );
}
