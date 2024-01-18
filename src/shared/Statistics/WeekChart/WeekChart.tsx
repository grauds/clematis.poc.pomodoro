import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Day } from './Day';
import { DaysBar } from './DaysBar';
import { Days, IDay, IDayStats } from '../../../types/model';
import { HLine } from './HLine';
import { RootState, setCurrentDay } from '../../../store/reducer';

import styles from "./weekchart.css";

export function WeekChart() {

  const dispatch = useDispatch();
  const selectedDay = useSelector<RootState, IDay>((state) => state.day);

  const weekstats: IDayStats[] = useSelector<RootState, IDayStats[]>((state) => {
    return state.stats
  })

  return (
    <div className={styles.weekchart}>
      { Days.map((day: IDay, index: number) => {
          return (
            <Day
              day={day}
              selected={selectedDay.name === day.name}
              handleClick={() => dispatch(setCurrentDay(day))}
              key={day.short}
              hpx={weekstats[index]?.time}
            />
          );
        })
      }
      <div className={styles.lines}>
         <HLine time='25 мин' />
         <HLine time='50 мин' />
         <HLine time='1 ч 15 мин' />
         <HLine time='1 ч 30 мин' />
      </div>
      <DaysBar />      
    </div>
  );
}
