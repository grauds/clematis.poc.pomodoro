import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITask } from '../../../types/model';
import { RootState, moveTaskBefore } from '../../../store/reducer';
import { Task } from './Task';

import styles from './taskslist.css';

export function TasksList() {
  const tasks = useSelector<RootState, ITask[]>((state) => state.tasks);
  const [dragging, setDragging] = useState<boolean>();
  const [draggedTaskId, setDraggedTaskId] = useState<string>();
  const [draggedOverTaskId, setDraggedOverTaskId] = useState<string>();

  const dispatch = useDispatch();

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);
    setDraggedTaskId(e.dataTransfer.getData('task'));
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDraggedOverTaskId(e.currentTarget.id);
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(moveTaskBefore(draggedTaskId, draggedOverTaskId));

    setDraggedOverTaskId('');
    setDragging(false);
    setDraggedTaskId(undefined);
  };

  const renderTask = (task: ITask): ReactNode => {
    return (
      <Task
        task={task}
        key={task.id}
        draggedOver={draggedOverTaskId === task.id && draggedTaskId !== task.id}
        dragEnter={dragEnter}
        dragLeave={dragLeave}
        dragStart={dragStart}
        dragEnd={drop}
      />
    );
  };

  return tasks?.length > 0 ? (
    <div className={styles.tasksList}>
      {tasks?.map((task) => {
        return renderTask(task);
      })}
    </div>
  ) : (
    <span />
  );
}
