import React from 'react';

import { CounterHeader } from './CounterHeader';
import { PlusBigIcon } from '../../icons';
import { formatTime } from '../../../utils/time';

import styles from './counter.css';

export interface ICounterProps {
  active: boolean;
  name: string;
  status: string;
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
  handleTimeAdd: () => void;
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
            <span className={styles.secondsPlaceholder}>
              <span className={styles[props.secondsCss]}>
                {formatTime(props.seconds)}
              </span>
            </span>
            <span className={styles.buttonPlaceholder}>
              <button aria-label='timeAdd' onClick={props.handleTimeAdd}>
                <PlusBigIcon />
              </button>
            </span>
          </div>
          <div className={styles.task}>
            <span className={styles.taskHeader}>Статус - </span>
            {props.status}
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
