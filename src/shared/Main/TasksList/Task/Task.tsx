import React from 'react';
import { ITask } from '../../../../types/model';
import { MenuButton } from './MenuButton';

import styles from './task.css';

interface ITaskProps {
  task: ITask,
  no: number
}

export function Task({task, no}: ITaskProps) {
  return (
    <div className={styles.task}>
       <span className={styles.number}>{no}</span> { task.name } <MenuButton />
    </div>
  );
}
