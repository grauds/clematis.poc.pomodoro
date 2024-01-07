import React from 'react';
import styles from './daytotals.css';
import { IDay } from '../../../types/model';

interface IDayTotals {
   day: IDay,
   time: string
}

export function DayTotals({day, time}: Readonly<IDayTotals>) {
   
  return (
     <div className={styles.daytotals}>
        <div className={styles.header}><h2>{day.name}</h2></div>
        <div className={styles.description}>Вы работали над задачами в течение <span className={styles.minutes}>{time}</span></div>
     </div>
  );
}
