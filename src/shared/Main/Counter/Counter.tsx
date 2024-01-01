import React from 'react';
import { ControlBar } from './ControlBar';

import styles from './counter.css';

interface ICounterProps {
  taskTitle: string;
  time?: string;
}

export function Counter({ taskTitle, time }: Readonly<ICounterProps>) {
  return (
    <div className={styles.counter}>
       <div className={styles.header}>
          {taskTitle}
       </div>
       <div className={styles.body} >
          {time ?? '25:00'} 
       </div>
       <div className={styles.task} >
          <span className={styles.taskHeader}>Задача 1 -</span> {taskTitle} 
       </div>
       <ControlBar />
    </div>
  );
}
