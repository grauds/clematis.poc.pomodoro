import React from 'react';
import { Day } from './Day';
import { DaysBar } from './DaysBar';
import { Days, IDay } from '../../../types/model';
import { HLine } from './HLine';

import styles from './weekchart.css';

export function WeekChart() {

  return (
    <div className={styles.weekchart}>
      { Days.map((day: IDay) => {
          return <Day day={day} key={day.short} hpx={Math.random() * 100}/>
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
