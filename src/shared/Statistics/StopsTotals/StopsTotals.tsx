import React from 'react';
import styles from './stopstotals.css';
import { StopIcon } from '../../icons';

interface IStopsTotals {
  stops?: number;
}

export function StopsTotals({stops}: IStopsTotals) {

  const active = (stops ?? 0) > 0
  const activeClass = active ? styles.active : ''

  return (
    <div className={`${styles.stoptotals} ${activeClass}`}>
      <div>
        <div className={styles.header}>Остановки</div>
        <div className={styles.percent}>{stops}</div>
      </div>
      <div className={styles.icon}>
        <StopIcon active={active} />
      </div>
    </div>
  );
}
