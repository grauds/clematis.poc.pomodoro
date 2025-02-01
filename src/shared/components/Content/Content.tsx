import React from 'react';
import styles from './content.css';

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: Readonly<IContentProps>) {
  return <main className={styles.content}>{children}</main>;
}
