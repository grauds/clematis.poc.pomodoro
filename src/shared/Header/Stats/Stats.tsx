import React from 'react';
import { StatsIcon } from '../../icons';

import styles from './stats.css';

export function Stats() {
  return (
    <div className={styles.stats}>
      <StatsIcon /> <div className={styles.text}>Статистика</div>
    </div>
  );
}
