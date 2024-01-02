import React from 'react';
import { noop } from '../../../utils/noop';

import styles from './menuitem.css';

interface IMenuItem {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export function MenuItem({ icon, title, onClick = noop }: IMenuItem) {
  return (
      <div className={styles.menuItem} onClick={ onClick }>
        {icon}
        <span className={styles.menuItemTitle}>
           {title}
        </span>
      </div> 
  );
}
