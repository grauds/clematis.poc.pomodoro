import React from 'react';
import styles from './controlbar.css';

export function ControlBar() {
  return (
     <div className={styles.controlBar}>      
        <button className={styles.start}>Старт</button>
        <button className={styles.stop}>Стоп</button>
     </div>
  );
}
