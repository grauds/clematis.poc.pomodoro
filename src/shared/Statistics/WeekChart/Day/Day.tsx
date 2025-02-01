import React from 'react';
import { IDay } from '../../../../types/model';
import { noop } from '../../../../utils/noop';

import styles from './day.css';

interface IDayProps {
  day: IDay;
  selected: boolean;
  handleClick: () => void;
  hpx?: number;
}

export function Day({
  day,
  hpx,
  selected = false,
  handleClick = noop,
}: Readonly<IDayProps>): React.JSX.Element {
  const fillerCss = selected ? styles.fillerSelected : styles.filler;
  const nameCss = selected ? styles.nameSelected : styles.name;

  return (
    <div className={styles.day}>
      <button className={nameCss} onClick={handleClick}>
        {day.short}
      </button>
      <button
        onClick={handleClick}
        className={hpx ? fillerCss : styles.empty}
        style={{ height: hpx && hpx > 0 ? hpx : 5 }}
      ></button>
    </div>
  );
}
