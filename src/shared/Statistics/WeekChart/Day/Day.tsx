import React from 'react';
import { IDay } from '../../../../types/model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCurrentDay } from '../../../../store/reducer';

import styles from './day.css';

interface IDayProps {
  day: IDay;
  hpx?: number;
}

export function Day({day, hpx}: Readonly<IDayProps>) {


  const selectedDay = useSelector<RootState, IDay>((state) => state.day);
  const selected = selectedDay === day
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setCurrentDay(day));
  }
// TODO: correct select class addition
  return (
    <div className={styles.day}>
      <button className={selected ? styles.nameSelected : styles.name}  onClick={handleClick}>
        {day.short}
      </button>
      <button onClick={handleClick}
           className={hpx ? (selected ? styles.fillerSelected : styles.filler) : styles.empty} style={{height: (hpx && hpx > 0) ? hpx : 5}}
      >
      </button>
    </div>
  );
}
