import React from 'react';
import { Counter } from './Counter';
import { AddTaskForm } from './AddTaskForm';
import { TasksList } from './TasksList';

import styles from './main.css';
import { addTask } from '../../store/reducer';
import { useDispatch } from 'react-redux';

export function Main() {

  const dispatch = useDispatch();

  return (
     <div className={styles.main}>
         <div>
          <div><h1>Ура! Теперь можно начать работать:</h1>
            <ul>
              <li>
                Выберите категорию и напишите название текущей задачи
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
              id: 'tst',
              name: taskName
            }))
          }}/>
          <TasksList /> 
                        
         </div>
         <Counter taskTitle='Test task'/>
     </div>
  );
}
