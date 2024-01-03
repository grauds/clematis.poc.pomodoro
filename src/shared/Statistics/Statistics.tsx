import React from 'react';
import { DayTotals } from './DayTotals';
import { PomodoroTotals } from './PomodoroTotals';
import { FocusTotals } from './FocusTotals';
import { WeekChart } from './WeekChart';
import { PauseTotals } from './PauseTotals';
import { StopsTotals } from './StopsTotals';

import styles from './statistics.css';

export function Statistics() {
  return (
     <div className={styles.statistics}>
       <div className={styles.center}>
          <div className={styles.leftColumn}>
            <DayTotals />
            <PomodoroTotals />
          </div>
          <WeekChart />
       </div>
       <div className={styles.footer}>
         <FocusTotals /> 
         <PauseTotals />
         <StopsTotals />
       </div>
     </div>
  );
}
