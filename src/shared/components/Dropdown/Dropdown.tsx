import React, { useEffect, useRef } from 'react';
import { noop } from '../../../utils/noop';

import styles from './dropdown.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Dropdown({
  button,
  children,
  isOpen,
  onOpen = noop,
  onClose = noop,
}: Readonly<IDropdownProps>): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  useEffect(() => setIsDropdownOpen(isOpen ?? false), [isOpen]);
  useEffect(() => (isDropdownOpen ? onOpen() : onClose()), [isDropdownOpen]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        onClose?.();
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className={styles.container} ref={ref}>
      <button aria-label='menuButton' onClick={handleOpen}>{button}</button>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <button className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </button>
        </div>
      )}
    </div>
  );
}
