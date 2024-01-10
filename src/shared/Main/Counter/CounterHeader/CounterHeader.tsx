import React from 'react';
import styles from './counterheader.css';

interface ICounterHeaderProps {  
  header?: string;
  pomodoroNo?: number; // currently running pomodoro from a sequence of 3 for instance.
  running?: boolean;
}

export function CounterHeader({ header, pomodoroNo, running = false }: Readonly<ICounterHeaderProps>) {

  const runningCss = running ? styles.running : '';

  function writeHeader(maxLength: number) {
    return (header?.length && header?.length > maxLength) ? header.substring(0, maxLength).concat('...') : header
  }

  return (
    <div className={`${styles.counterheader} ${runningCss}`}>
      <span>{header ? writeHeader(30) : "No task selected"}</span>
      {header ? (
        <span className={styles.total}>Помидор: {pomodoroNo ?? 1}</span>
      ) : (
        ""
      )}
    </div>
  );
}
