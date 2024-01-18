import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Day } from './Day';
import { DaysBar } from './DaysBar';
import { EWeek, IDayStats, IWeek, getDayStats, newWeekStats } from '../../../types/model';
import { HLine } from './HLine';
import {
  getMonday,
  getMondayTwoWeeksAgo,
  getPreviousMonday,
  sameDay,
} from "../../../utils/time";
import { RootState, setCurrentDay } from '../../../store/reducer';

import styles from "./weekchart.css";

export function WeekChart() {

  const dispatch = useDispatch();
  const selectedDay = useSelector<RootState, IDayStats>((state) => state.day);
  const selectedWeek = useSelector<RootState, IWeek>((state) => state.week);

  let monday: Date;

  switch (selectedWeek.id) {
    case EWeek.THIS_WEEK:
      monday = getMonday(new Date())
      break;
    case EWeek.PREVIOUS_WEEK:
      monday = getPreviousMonday(new Date())
      break;
    case EWeek.TWO_WEEKS_AGO:
      monday = getMondayTwoWeeksAgo(new Date())
      break; 
    default:
      monday = getMonday(new Date());     
  }

  const weekDays = newWeekStats(monday);

  const weekstats: IDayStats[] = useSelector<RootState, IDayStats[]>((state) => {
    return state.stats
  })

  return (
    <div className={styles.weekchart}>
      {weekDays.map((day: IDayStats) => {
        return (
          <Day
            day={day}
            selected={sameDay(selectedDay.date, day.date)}
            handleClick={() => dispatch(setCurrentDay(day))}
            key={day.short}
            hpx={getDayStats(weekstats, day.date)?.time}
          />
        );
      })}
      <div className={styles.lines}>
        <HLine time="25 мин" />
        <HLine time="50 мин" />
        <HLine time="1 ч 15 мин" />
        <HLine time="1 ч 30 мин" />
      </div>
      <DaysBar />
    </div>
  );
}
