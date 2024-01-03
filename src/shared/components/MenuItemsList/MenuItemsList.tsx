import React from 'react';
import styles from './menuitemslist.css';

interface IMenuItemsList {
  children: React.ReactNode;
}

export function MenuItemsList({ children }: Readonly<IMenuItemsList>) {
  return (
    <div className={`${styles.popup} ${styles.arrowTop}`}>
      <div className={styles.popupWrapper}>
        { children }
      </div>      
    </div>
  );
}
