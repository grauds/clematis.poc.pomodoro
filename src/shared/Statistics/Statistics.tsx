import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { IDayStats, getDayStats, getTotalPomodoriDone } from '../../types/model';

import { DayTotals } from './DayTotals';
import { PomodoroTotals } from './PomodoroTotals';
import { FocusTotals } from './FocusTotals';
import { WeekChart } from './WeekChart';
import { PauseTotals } from './PauseTotals';
import { StopsTotals } from './StopsTotals';
import { StatsHeader } from './StatsHeader';

import styles from './statistics.css';

export function Statistics() {

  const selectedDay: IDayStats = useSelector<RootState, IDayStats>((state) => state.day);
  const totalPomodoroDone = useSelector<RootState, number>((state) => {
    return getTotalPomodoriDone(state.tasks)
  });
  const statsForSelectedDay: IDayStats = useSelector<RootState, IDayStats>((state) => {
    return getDayStats(state.stats, selectedDay.date)
  });


  return (
    <div className={styles.statistics}>
      <StatsHeader />
      <div className={styles.center}>
        <div className={styles.leftColumn}>
          <DayTotals
            day={selectedDay}
            time={`${statsForSelectedDay.time} минут`}
          />
          <PomodoroTotals pomodoro={totalPomodoroDone} />
        </div>
        <WeekChart />
      </div>
      <div className={styles.footer}>
        <FocusTotals percent={statsForSelectedDay.time} />
        <PauseTotals time={statsForSelectedDay.pause} />
        <StopsTotals stops={statsForSelectedDay.stops} />
      </div>
    </div>
  );
}
