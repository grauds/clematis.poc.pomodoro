import React from 'react';
import { DayTotals } from './DayTotals';
import { PomodoroTotals } from './PomodoroTotals';
import { FocusTotals } from './FocusTotals';
import { WeekChart } from './WeekChart';
import { PauseTotals } from './PauseTotals';
import { StopsTotals } from './StopsTotals';
import { StatsHeader } from './StatsHeader';

import styles from './statistics.css';

export function Statistics() {
  return (
     <div className={styles.statistics}>
       <StatsHeader />
       <div className={styles.center}>
          <div className={styles.leftColumn}>
            <DayTotals />
            <PomodoroTotals pomodoro={9}/>
          </div>
          <WeekChart />
       </div>
       <div className={styles.footer}>
         <FocusTotals percent={35}/> 
         <PauseTotals time={35} />
         <StopsTotals stops={3}/>
       </div>
     </div>
  );
}
