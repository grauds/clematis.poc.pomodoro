import React from 'react';
import { Counter } from './Counter';
import styles from './main.css';

export function Main() {
  return (
     <div className={styles.main}>
         <div>
            <h1>Ура! Теперь можно начать работать:</h1>
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
            </ul>
         </div>
         <Counter taskTitle='Test task'/>
     </div>
  );
}
