import React from 'react';
import { WeekSelector } from './WeekSelector';

import styles from './statsheader.css';

export function StatsHeader(): React.JSX.Element {
  return (
    <div className={styles.statsheader}>
      <h1>Ваша активность</h1>
      <div className={styles.period}>
        <WeekSelector />
      </div>
    </div>
  );
}
