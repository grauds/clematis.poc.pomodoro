import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Day } from "./Day";
import { DaysBar } from "./DaysBar";
import {
  IDayStats,
  IWeek,
  getDayStats,
  getWeekMaxTime,
} from "../../../types/model";
import { HLine } from "./HLine";
import { formatTimeShort, sameDay } from "../../../utils/time";
import { RootState, setCurrentDay } from "../../../store/reducer";

import styles from "./weekchart.css";

export function WeekChart(): React.JSX.Element {
  const dispatch = useDispatch();
  const selectedDay = useSelector<RootState, IDayStats>((state) => state.day);
  const selectedWeek = useSelector<RootState, IWeek>((state) => state.week);
  const weekstats = useSelector<RootState, IDayStats[]>((state) => state.stats);

  const { weekDays, maxTime } = getWeekMaxTime(weekstats, selectedWeek);
  const tick = Math.floor(maxTime / 5);
  const scale = tick > 0 ? tick / 81 : 1;
  const hlines = [];
  for (let i = 1; i <= 4; i++) {
    hlines.push(<HLine key={i} time={formatTimeShort(i * tick)} />);
  }

  return (
    <div className={styles.weekchart}>
      {weekDays.map((day: IDayStats) => {
        return (
          <Day
            day={day}
            selected={sameDay(selectedDay.date, day.date)}
            handleClick={() => dispatch(setCurrentDay(day))}
            key={day.short}
            hpx={getDayStats(weekstats, day.date)?.time / scale}
          />
        );
      })}
      <div className={styles.lines}>{hlines}</div>
      <DaysBar />
    </div>
  );
}
