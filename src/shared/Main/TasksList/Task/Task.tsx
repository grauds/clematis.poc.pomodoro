import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskPomodoro, removeTask, removeTaskPomodoro } from "../../../../store/reducer";

import { ITask } from "../../../../types/model";
import { noop } from "../../../../utils/noop";
import { IItem } from "../../../components/GenericList";

import { DeleteIcon, EditIcon, MinusIcon, PlusIcon } from '../../../icons';
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

  const dispatch = useDispatch()

  const menuItems: IItem[] = [
    {
        id: '1',
        text: 'Увеличить',
        icon: <PlusIcon />,
        onClick: (id: string, e: any) => {
          e.stopPropagation();
          dispatch(addTaskPomodoro(task));
        }
    },
    {
        id: '2',
        text: 'Уменьшить',
        icon: <MinusIcon />,
        onClick: (id: string, e: any) => {
          e.stopPropagation();
          dispatch(removeTaskPomodoro(task));
        },
        disabled: task.pomodori <= 1
    },
    {
        id: '3',
        text: 'Редактировать',
        icon: <EditIcon />,
        onClick: (id: string, e: any) => {}
    },
    {
        id: '4',
        text: 'Удалить',
        icon: <DeleteIcon />,
        onClick: (id: string, e: any) => {dispatch(removeTask(task))}
    }
  ];

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
        {task.name} {Array(task.pomodori + 1).join('🍅')} <MenuButton menuItems={menuItems} />         
      </>
    </div>
  );
}
