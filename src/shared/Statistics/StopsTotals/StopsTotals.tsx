import React from 'react';
import styles from './stopstotals.css';
import { StopIcon } from '../../icons';

export function StopsTotals() {
  return (
    <div className={styles.stoptotals}>
      <div>
        <div className={styles.header}>Остановки</div>
        <div className={styles.percent}>0</div>
      </div>
      <div className={styles.icon}>
        <StopIcon />
      </div>
    </div>
  );
}
