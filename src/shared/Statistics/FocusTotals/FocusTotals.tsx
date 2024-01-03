import React from 'react';
import styles from './focustotals.css';
import { TargetIcon } from '../../icons';

export function FocusTotals() {
  return (
    <div className={styles.focustotals}>
      <div>
        <div className={styles.header}>Фокус</div>
        <div className={styles.percent}>0%</div>
      </div>
      <div className={styles.icon}>
        <TargetIcon />
      </div>
    </div>
  );
}
