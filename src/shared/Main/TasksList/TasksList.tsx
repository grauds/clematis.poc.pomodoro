import React, { ReactNode } from 'react';
import { ITask } from '../../../types/model';
import { Task } from './Task';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

import styles from './taskslist.css';

export function TasksList() {

  const tasks = useSelector<RootState, ITask[]>((state) => state.tasks);

  const renderTask = (task: ITask, i: number): ReactNode => {
    return <Task task={task} key={task.id} no={i} />;
  };

  return (
    <div className={styles.tasksList}>
       {tasks?.length === 0 && (
          <div style={{ textAlign: "center" }}>No tasks</div>
        )}

       {tasks?.map((task, i) => {
          return renderTask(task, i);
        })} 
    </div>
  );
}
