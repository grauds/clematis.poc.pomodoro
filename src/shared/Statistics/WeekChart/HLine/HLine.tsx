import React from 'react';
import styles from './hline.css';

interface IHLineProps {
  time: string;
}

export function HLine({ time }: Readonly<IHLineProps>) {
  return (
    <div className={styles.hline}>
      <span className={styles.line}></span>
      <span className={styles.text}>{time}</span>
    </div>
  );
}
