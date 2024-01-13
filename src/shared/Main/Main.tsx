import React from 'react';
import { AddTaskForm } from './AddTaskForm';
import { TasksList } from './TasksList';

import { addTask } from '../../store/reducer';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import styles from './main.css';
import { ETaskStatus } from '../../types/model';
import { CounterContainer } from './CounterContainer';

export function Main() {

  const dispatch = useDispatch();

  return (
     <div className={styles.main}>
         <div>
          <div><h1>Ура! Теперь можно начать работать:</h1>
            <ul>
              <li>
                Напишите название текущей задачи и добавьте в список
              </li>
              <li>
                Запустите таймер («помидор»)
              </li>
              <li>
                Работайте пока «помидор» не прозвонит
              </li>
              <li>
                Сделайте короткий перерыв (3-5 минут)
              </li>
              <li>
                Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут). 
              </li>
            </ul></div>
          <AddTaskForm onSubmit={(taskName) => {
            dispatch(addTask({
              id: uuidv4(),
              name: taskName,
              status: ETaskStatus.NOT_STARTED,
              pomodori: []
            }))
          }}/>
          <TasksList /> 
                        
         </div>
         <CounterContainer />
     </div>
  );
}
