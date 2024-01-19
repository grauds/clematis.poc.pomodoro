import React from 'react';
import styles from './focustotals.css';
import { TargetIcon } from '../../icons';

interface IFocusTotals {
  percent?: number;
}

export function FocusTotals({percent}: Readonly<IFocusTotals>) {

  const active = (percent ?? 0) > 0
  const activeClass = active ? styles.active : ''

  return (
    <div className={`${styles.focustotals} ${activeClass}`}>
      <div>
        <div className={styles.header}>Фокус</div>
        <div className={styles.percent}>{percent ? percent?.toFixed(0) : 0}%</div>
      </div>
      <div className={styles.icon}>
        <TargetIcon active={active} />
      </div>
    </div>
  );
}
