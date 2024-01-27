import React from 'react';
import styles from './menuitemslist.css';

interface IMenuItemsList {
  children: React.ReactNode;
}

export function MenuItemsList({
  children,
}: Readonly<IMenuItemsList>): React.JSX.Element {
  return (
    <div className={`${styles.popup} ${styles.arrowTop}`}>
      <div className={styles.popupWrapper}>{children}</div>
    </div>
  );
}
