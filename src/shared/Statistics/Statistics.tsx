import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { IDay, IWeek } from '../../types/model';

import { DayTotals } from './DayTotals';
import { PomodoroTotals } from './PomodoroTotals';
import { FocusTotals } from './FocusTotals';
import { WeekChart } from './WeekChart';
import { PauseTotals } from './PauseTotals';
import { StopsTotals } from './StopsTotals';
import { StatsHeader } from './StatsHeader';

import styles from './statistics.css';

export function Statistics() {

  // TODO: yeild selected week stats
  const selectedWeek = useSelector<RootState, IWeek>((state) => state.week);
  const selectedDay = useSelector<RootState, IDay>((state) => state.day);

  return (
     <div className={styles.statistics}>
       <StatsHeader />
       <div className={styles.center}>
          <div className={styles.leftColumn}>
            <DayTotals day={selectedDay} time={'51 минуты'} />
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
