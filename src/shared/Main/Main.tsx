import React from 'react';
import { AddTaskForm } from './AddTaskForm';
import { TasksList } from './TasksList';

import { RootState, addTask, toggleInfo } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ETaskStatus } from "../../types/model";
import { CounterContainer } from "./CounterContainer";

import styles from "./main.css";

export function Main(): React.JSX.Element {

  const dispatch = useDispatch();

  const info = useSelector<RootState, boolean>((state) => state.info);

  return (
    <div className={styles.main}>
      <div>
        <div>
          <h1>Ура, можно начать работать!</h1>
          <div className={styles.infoToggle}>
            {info ? (
              <button onClick={() => dispatch(toggleInfo(false))}>
                Спрятать помощь
              </button>
            ) : (
              <button onClick={() => dispatch(toggleInfo(true))}>
                Открыть помощь 👇
              </button>
            )}
          </div>
          {info ? (
            <ul>
              <li>Напишите название текущей задачи и добавьте в список</li>
              <li>Перетащите задачу на первую позицию в списке</li>
              <li>Запустите таймер («помидор»)</li>
              <li>Работайте пока «помидор» не прозвонит</li>
              <li>
                Сделайте короткий перерыв (конфигурируется в настройках, 3-5
                минут)
              </li>
              <li>
                Продолжайте работать «помидор» за «помидором», пока задача не
                будут выполнена. Каждые 4 «помидора» делайте длинный перерыв
                (конфигурируется в настройках, 15-30 минут).
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <AddTaskForm
          onSubmit={(taskName) => {
            dispatch(
              addTask({
                id: uuidv4(),
                name: taskName,
                status: ETaskStatus.NOT_STARTED,
                pomodori: [],
              })
            );
          }}
        />
        <TasksList />
      </div>
      <CounterContainer />
    </div>
  );
}
