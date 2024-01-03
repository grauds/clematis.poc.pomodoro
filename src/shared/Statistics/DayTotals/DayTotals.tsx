import React from 'react';
import styles from './daytotals.css';

export function DayTotals() {
  return (
     <div className={styles.daytotals}>
        <div className={styles.header}><h2>Понедельник</h2></div>
        <div className={styles.description}>Вы работали над задачами в течение <span className={styles.minutes}>51 минуты</span></div>
     </div>
  );
}
