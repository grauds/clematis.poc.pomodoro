import React from 'react';
import { ClockIcon } from '../../icons';
import { formatMinsShort } from '../../../utils/time';

import styles from './pausetotals.css';

interface IPauseTotals {
  time?: number;
}

export function PauseTotals({time}: Readonly<IPauseTotals>) {

  const active = (time ?? 0) > 0
  const activeClass = active ? styles.active : ''

  return (
    <div className={`${styles.pausetotals} ${activeClass}`}>
      <div>
        <div className={styles.header}>Время на паузе</div>
        <div className={styles.percent}>{formatMinsShort(time ?? 0)}</div>
      </div>
      <div className={styles.icon}>
        <ClockIcon active={active} />
      </div>
    </div>
  );
}
