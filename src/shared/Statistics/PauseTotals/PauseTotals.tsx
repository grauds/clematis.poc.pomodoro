import React from 'react';
import styles from './pausetotals.css';
import { ClockIcon } from '../../icons';

export function PauseTotals() {
  return (
    <div className={styles.pausetotals}>
      <div>
        <div className={styles.header}>Время на паузе</div>
        <div className={styles.percent}>0м</div>
      </div>
      <div className={styles.icon}>
        <ClockIcon />
      </div>
    </div>
  );
}
