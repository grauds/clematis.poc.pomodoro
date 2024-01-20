import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import {
  IDayStats,
  getDayPomodoriDone,
  getDayStats,
} from "../../types/model";

import { DayTotals } from "./DayTotals";
import { PomodoroTotals } from "./PomodoroTotals";
import { FocusTotals } from "./FocusTotals";
import { WeekChart } from "./WeekChart";
import { PauseTotals } from "./PauseTotals";
import { StopsTotals } from "./StopsTotals";
import { StatsHeader } from "./StatsHeader";
import { formatTimeLong } from "../../utils/time";

import styles from "./statistics.css";

export function Statistics(): React.JSX.Element {

  const selectedDay: IDayStats = useSelector<RootState, IDayStats>(
    (state) => state.day
  );
  
  const totalPomodoroDone = useSelector<RootState, number>((state) => {
    return getDayPomodoriDone(state.tasks, selectedDay);
  });

  const statsForSelectedDay: IDayStats = useSelector<RootState, IDayStats>(
    (state) => {
      return getDayStats(state.stats, selectedDay.date);
    }
  );

  function getFocusTime(): number {
    return statsForSelectedDay.time * 100 / (statsForSelectedDay.time + statsForSelectedDay.pause)
  }

  return (
    <div className={styles.statistics}>
      <StatsHeader />
      <div className={styles.center}>
        <div className={styles.leftColumn}>
          <DayTotals
            day={selectedDay}
            time={formatTimeLong(statsForSelectedDay.time)}
          />
          <PomodoroTotals pomodoro={totalPomodoroDone} />
        </div>
        <WeekChart />
      </div>
      <div className={styles.footer}>
        <FocusTotals
          percent={getFocusTime()}
        />
        <PauseTotals time={statsForSelectedDay.pause} />
        <StopsTotals stops={statsForSelectedDay.stops} />
      </div>
    </div>
  );
}
