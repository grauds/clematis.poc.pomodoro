import React from "react";

import { CounterHeader } from "./CounterHeader";
import { PlusBigIcon } from "../../icons";
import { formatTime } from "../../../utils/time";

import styles from "./counter.css";

export interface ICounterProps {
  active: boolean;
  name: string;  
  pomodoroNo: number;
  seconds: number;
  titleCss: string;
  secondsCss: string;
  bodyCss: string;
  leftButtonTitle: string;
  leftButtonAction: () => void;
  rightButtonTitle: string;
  rightBuittonAction: () => void;
  rightButtonDisabled: boolean;
  handleTimeAdd: () => void
}

export function Counter(props: Readonly<ICounterProps>): React.JSX.Element {
  return (
    <div className={styles.counter}>
      <CounterHeader
        header={props.name}
        pomodoroNo={props.pomodoroNo}
        runningCss={props.titleCss}
      />
      {props.active ? (
        <>
          <div className={`${styles.body} ${styles[props.bodyCss]}`}>
            <span className={styles.placeholder}></span>
            <span className={styles[props.secondsCss]}>
              {formatTime(props.seconds)}
            </span>
            <button onClick={props.handleTimeAdd}>
              <PlusBigIcon />
            </button>
          </div>
          <div className={styles.task}>
            <span className={styles.taskHeader}>Задача - </span>
            {props.name}
          </div>
          <div className={styles.controlBar}>
            <button className={styles.start} onClick={props.leftButtonAction}>
              {props.leftButtonTitle}
            </button>
            <button
              className={styles.stop}
              onClick={props.rightBuittonAction}
              disabled={props.rightButtonDisabled}
            >
              {props.rightButtonTitle}
            </button>
          </div>
        </>
      ) : (
        <span className={styles.body}></span>
      )}
    </div>
  );
}
