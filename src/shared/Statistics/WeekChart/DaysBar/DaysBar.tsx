import React from 'react';
import styles from './daysbar.css';

export function DaysBar(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.daysbar}></div>
    </div>
  );
}
