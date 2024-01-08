import React, { useState } from "react";
import { ITask } from "../../../../types/model";
import { noop } from "../../../../utils/noop";
import { MenuButton } from "./MenuButton";

import styles from "./task.css";

interface ITaskProps {
  task: ITask;
  draggedOver: boolean;
  dragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function Task({
  task,
  draggedOver = false,
  dragEnter = noop,
  dragLeave = noop,
  dragStart = noop,
  dragEnd = noop,
}: ITaskProps) {
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const draggingClass = isDragged ? styles.dragging : "";
  const draggedOverClass = draggedOver ? styles.draggedOver : "";

  function internalDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("task", task.id);
    setIsDragged(true);
    dragStart(e);
  }

  function internalDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("task", task.id);
    setIsDragged(false);
    dragEnd(e);
  }

  return (
    <div
      id={task.id}
      className={`${styles.task} ${draggingClass} ${draggedOverClass}`}
      draggable
      onDragStart={(e) => internalDragStart(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDragEnd={(e) => internalDragEnd(e)}
    >
      <>
        <span className={`${styles.number} ${draggingClass}`}>{task.no}</span>
        {" "}
        {task.name} {Array(task.pomodori + 1).join('🍅')} <MenuButton />         
      </>
    </div>
  );
}
