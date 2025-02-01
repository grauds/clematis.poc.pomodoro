import React from 'react';
import { IDayStats } from '../../../types/model';
import styles from './daytotals.css';

interface IDayTotals {
  day: IDayStats;
  time: string;
}

export function DayTotals({
  day,
  time,
}: Readonly<IDayTotals>): React.JSX.Element {
  return (
    <div className={styles.daytotals}>
      <div className={styles.header}>
        <h2>
          {day.name} ({day.date.toLocaleDateString()})
        </h2>
      </div>
      <div className={styles.description}>
        Вы работали над задачами в течение{' '}
        <span className={styles.minutes}>{time}</span>
      </div>
    </div>
  );
}
