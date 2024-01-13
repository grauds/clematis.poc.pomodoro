import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { EPomodoroStatus, IDay, ITask, IWeek } from '../../types/model';

import { DayTotals } from './DayTotals';
import { PomodoroTotals } from './PomodoroTotals';
import { FocusTotals } from './FocusTotals';
import { WeekChart } from './WeekChart';
import { PauseTotals } from './PauseTotals';
import { StopsTotals } from './StopsTotals';
import { StatsHeader } from './StatsHeader';

import styles from './statistics.css';

export function Statistics() {

  const tasks = useSelector<RootState, ITask[]>((state) => state.tasks);

  const selectedWeek = useSelector<RootState, IWeek>((state) => state.week);
  const selectedDay = useSelector<RootState, IDay>((state) => state.day);

  let totalPomodoroDone = 0;
  tasks.forEach((task) => {
    task.pomodori.forEach((pomodoro) => {
      if (pomodoro.status === EPomodoroStatus.DONE) {
        totalPomodoroDone++
      }
    })
  })

  return (
     <div className={styles.statistics}>
       <StatsHeader />
       <div className={styles.center}>
          <div className={styles.leftColumn}>
            <DayTotals day={selectedDay} time={'51 минуты'} />
            <PomodoroTotals pomodoro={totalPomodoroDone}/>
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
