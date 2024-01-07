import React from 'react';
import styles from './counterheader.css';

interface ICounterHeaderProps {  
  header?: string;
  pomodoroNo?: number; // currently running pomodoro from a sequence of 3 for instance.
}

export function CounterHeader({ header, pomodoroNo }: Readonly<ICounterHeaderProps>) {
  return (
    <div className={styles.counterheader}>
       <span>{ header ?? 'No task selected' }</span>
       { header ? <span className={styles.total}>Помидор: {pomodoroNo ?? 1}</span> : '' }
    </div>
  );
}
