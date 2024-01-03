import React from 'react';
import styles from './pausetotals.css';
import { ClockIcon } from '../../icons';

interface IPauseTotals {
  time?: number;
}

export function PauseTotals({time}: IPauseTotals) {

  const active = (time ?? 0) > 0
  const activeClass = active ? styles.active : ''

  return (
    <div className={`${styles.pausetotals} ${activeClass}`}>
      <div>
        <div className={styles.header}>Время на паузе</div>
        <div className={styles.percent}>{time ?? 0}мин</div>
      </div>
      <div className={styles.icon}>
        <ClockIcon active={active} />
      </div>
    </div>
  );
}
