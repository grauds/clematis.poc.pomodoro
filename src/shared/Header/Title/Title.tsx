import React from 'react';
import { HomeIcon } from '../../icons/HomeIcon';

import styles from './title.css';

export function Title() {
  return (
    <div className={styles.title}>
      <HomeIcon /> <div className={styles.brand}>pomodoro_box</div>
    </div>
  );
}
