import React from 'react';
import styles from './counterheader.css';

interface ICounterHeaderProps {  
  header?: string;
  pomodoroNo?: number; // currently running pomodoro from a sequence of 3 for instance.
}

export function CounterHeader({ header, pomodoroNo }: Readonly<ICounterHeaderProps>) {

  function writeHeader(maxLength: number) {
    return (header?.length && header?.length > maxLength) ? header.substring(0, maxLength).concat('...') : header
  }

  return (
    <div className={styles.counterheader}>
       <span>{ header ? writeHeader(30) : 'No task selected' }</span>
       { header ? <span className={styles.total}>Помидор: {pomodoroNo ?? 1}</span> : '' }
    </div>
  );
}
