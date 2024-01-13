import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, updateTask } from "../../../store/reducer";
import { ETaskStatus, ITask } from "../../../types/model";
import { CounterHeader } from "./CounterHeader";
import { PlusBigIcon } from "../../icons";
import { formatTime } from "../../../utils/time";

import styles from "./counter.css";

interface ICounterProps {
  time?: number;
}

export function Counter({ time }: Readonly<ICounterProps>) {
  
  // current task reference
  const currentTask = useSelector<RootState, ITask | undefined>((state) =>
    state.tasks.length > 0 ? state.tasks[0] : undefined
  );
  // seconds for the current run
  const [seconds, setSeconds] = useState((time && time > 0) ? time : 25 * 60);
  // running task state
  const [isTaskRunning, setIsTaskRunning] = useState<boolean>(false);
  // running pause state
  const [isBreakRunning, setIsBreakRunning] = useState<boolean>(false);
  // is running state on pause
  const [isPause, setIsPause] = useState<boolean>(false);

  const runningCss = isTaskRunning ? styles.running : "";

  const dispatch = useDispatch();

  function handleClick() {
     setSeconds(seconds + 60)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTaskRunning && seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, isTaskRunning, isPause]);

  function startTimer() {
    setIsTaskRunning(true);
    setIsPause(false);
  }

  function pauseTimer() {
    setIsTaskRunning(false);
    setIsPause(true);
  }

  function stopTimer() {
    setIsPause(false)
    setIsTaskRunning(false);
  }

  function finishTask() {
    if (currentTask) {
      currentTask.status = ETaskStatus.DONE
      dispatch(updateTask(currentTask))
    }
  }

  return (
    <div className={styles.counter}>
      <CounterHeader
        header={currentTask?.name}
        running={isTaskRunning || isPause}
      />
      {currentTask ? (
        <>
          <div className={`${styles.body} ${runningCss}`}>
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
              {isTaskRunning ? "Пауза" : (isPause ? "Продолжить" : "Старт")}
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
              { isPause ? 'Сделано' : 'Стоп' }
            </button>
          </div>
        </>
      ) : (
        <span className={styles.body}></span>
      )}
    </div>
  );
}
