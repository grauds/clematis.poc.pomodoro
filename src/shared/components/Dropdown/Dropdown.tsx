import React, { useRef } from 'react';
import styles from './dropdown.css';
import { noop } from '../../../utils/noop';

interface IDropdownProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Dropdown({ children, onClose = noop }: Readonly<IDropdownProps>) {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
        if( event.target instanceof Node && !ref.current?.contains(event.target) ) {
           onClose?.()
        }
    }
    document.addEventListener('click', handleClick); 

    return () => {
        document.removeEventListener('click', handleClick);
    }
  }, [])

  return (
      <div className={styles.container} ref={ref}>
        <div className={styles.listContainer}>
          <div 
              className={styles.list} 
              onClick={ () => onClose() }
              > 
             {children}
          </div>
        </div>   
      </div>
  );
}
