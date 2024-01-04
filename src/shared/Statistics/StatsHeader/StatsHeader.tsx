import React from 'react';
import { WeekSelector } from './WeekSelector';

import styles from './statsheader.css';

export function StatsHeader() {
  return (
    <div className={styles.statsheader}>
      <h2>Ваша активность</h2>
      <div className={styles.period}>
        <WeekSelector />
      </div>      
    </div>
  );
}
