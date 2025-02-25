import React from 'react';
import styles from './counterheader.css';

interface ICounterHeaderProps {
  header: string;
  pomodoroNo: number; // currently running pomodoro
  runningCss: string;
}

export function CounterHeader({
  header,
  pomodoroNo,
  runningCss,
}: Readonly<ICounterHeaderProps>): React.JSX.Element {
  function writeHeader(maxLength: number) {
    return header?.length && header?.length > maxLength
      ? header.substring(0, maxLength).concat('...')
      : header;
  }

  return (
    <div className={`${styles.counterheader} ${styles[runningCss]} `}>
      <h2>{header ? writeHeader(30) : 'No task selected'}</h2>
      {header ? (
        <span className={styles.total}>Помидор: {pomodoroNo ?? 1}</span>
      ) : (
        ''
      )}
    </div>
  );
}
