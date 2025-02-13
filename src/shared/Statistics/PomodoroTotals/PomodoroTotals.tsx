import React from 'react';
import { PomodoroIcon, PomodoroSmallIcon } from '../../icons';

import styles from './pomodorototals.css';

interface IPomodoroTotals {
  pomodoro?: number;
}

export function PomodoroTotals({ pomodoro }: Readonly<IPomodoroTotals>) {
  const icon =
    (pomodoro ?? 0) > 0 ? (
      <div className={styles.icon}>
        <PomodoroSmallIcon />
        <span> x {pomodoro}</span>
      </div>
    ) : (
      <PomodoroIcon />
    );

  const footer =
    (pomodoro ?? 0) > 0 ? (
      <div className={styles.footer}>{pomodoro} помидор</div>
    ) : (
      ''
    );

  return (
    <div className={styles.pomodorototals}>
      {icon}
      {footer}
    </div>
  );
}
