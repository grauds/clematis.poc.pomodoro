import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  addTaskPomodoro,
  removeTask,
  removeTaskPomodoro,
  updateTask,
} from "../../../../store/reducer";

import { ETaskStatus, ITask } from "../../../../types/model";
import { noop } from "../../../../utils/noop";
import { IItem } from "../../../components/GenericList";

import { DeleteIcon, EditIcon, MinusIcon, PlusIcon } from "../../../icons";
import { MenuButton } from "./MenuButton";
import { InputDialog } from "../../../components/InputDialog";
import { ConfirmDialog } from "../../../components/ConfirmDialog";

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
}: Readonly<ITaskProps>) {
  // current task reference
  const currentTask = useSelector<RootState, ITask | undefined>((state) =>
    state.tasks.length > 0 ? state.tasks[0] : undefined
  );

  const [isCurrentTask, setIsCurrentTask] = useState<boolean>(false);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const draggingClass = isDragged ? styles.dragging : "";
  const draggedOverClass = draggedOver ? styles.draggedOver : "";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const dispatch = useDispatch();

  const menuItems: IItem[] = [
    {
      id: "1",
      text: "Увеличить",
      icon: <PlusIcon />,
      onClick: (_id: string, e: any) => {
        e.stopPropagation();
        dispatch(addTaskPomodoro(task));
      },
    },
    {
      id: "2",
      text: "Уменьшить",
      icon: <MinusIcon />,
      onClick: (_id: string, e: any) => {
        e.stopPropagation();
        dispatch(removeTaskPomodoro(task));
      },
      disabled: task.pomodori <= 1,
    },
    {
      id: "3",
      text: "Редактировать",
      icon: <EditIcon />,
      onClick: (_id: string, _e: any) => {
        setIsDialogOpen(true);
      },
    },
    {
      id: "4",
      text: "Удалить",
      icon: <DeleteIcon />,
      onClick: (_id: string, _e: any) => {
        setIsConfirmationOpen(true)
      },
    },
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

  useEffect(() => {
    setIsCurrentTask(currentTask?.id === task.id);
  }, [currentTask]);

  return (
    <div
      id={task.id}
      className={`${styles.task} ${draggingClass} ${draggedOverClass}`}
      draggable={
        task.status === ETaskStatus.NOT_STARTED ||
        task.status === ETaskStatus.DONE
      }
      onDragStart={(e) => internalDragStart(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDragEnd={(e) => internalDragEnd(e)}
    >
      <span className={`${styles.number} ${draggingClass}`}>{task.no}</span>
      <span className={isCurrentTask ? styles.activeTask : ""}>
        {task.name} {Array(task.pomodori + 1).join("🍅")}
      </span>
      <MenuButton menuItems={menuItems} />
      <InputDialog
        title={"Имя задачи"}
        isOpen={isDialogOpen}
        text={task.name}
        onChange={() => {}}
        onSubmit={(text: string) => {
          task.name = text;
          dispatch(updateTask(task));
          setIsDialogOpen(false);
        }}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onValidate={(taskName: string) => {
          if (taskName?.length <= 3)
            return "Введите не меньше трех символов для новой задачи";
          return "";
        }}
      />
      <ConfirmDialog
        title={"Удалить задачу?"}
        isOpen={isConfirmationOpen}
        buttonTitle={"Удалить"}
        onSubmit={() => {
          setIsDialogOpen(false);
          dispatch(removeTask(task));
        }}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </div>
  );
}
