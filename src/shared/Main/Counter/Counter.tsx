import React from "react";
import { ControlBar } from "./ControlBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState, addTaskPomodoro } from "../../../store/reducer";
import { ITask } from "../../../types/model";
import { CounterHeader } from "./CounterHeader";
import { PlusBigIcon } from "../../icons";

import styles from "./counter.css";

interface ICounterProps {
  time?: string;
}

export function Counter({ time }: Readonly<ICounterProps>) {
  const dispatch = useDispatch();

  const currentTask = useSelector<RootState, ITask | undefined>((state) =>
    state.tasks.length > 0 ? state.tasks[0] : undefined
  );

  function handleClick() {
    dispatch(addTaskPomodoro(currentTask));
  }

  return (
    <div className={styles.counter}>
      <CounterHeader header={currentTask?.name} />
      {currentTask ? (
        <>
          <div className={styles.body}>
            <span className={styles.placeholder}></span> {time ?? "25:00"}
            <button onClick={handleClick}>
              <PlusBigIcon />
            </button>
          </div>
          <div className={styles.task}>
            <span className={styles.taskHeader}>Задача - </span>
            {currentTask?.name}
          </div>
          <ControlBar />
        </>
      ) : (
        <span className={styles.body}></span>
      )}
    </div>
  );
}
