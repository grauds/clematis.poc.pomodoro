import React from 'react';
import { createPortal } from 'react-dom';
import { Shadow } from '../Shadow';
import { CloseIcon } from '../../icons';
import { noop } from '../../../utils/noop';

import styles from './dialog.css';

interface IDialogProps {
  title?: string;
  isOpen?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export function Dialog({
  title,
  isOpen,
  children,
  onClose = noop,
}: Readonly<IDialogProps>): React.JSX.Element | null {
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return (
    <>
      {' '}
      {isOpen &&
        createPortal(
          <>
            <Shadow />
            <div className={styles.dialog}>
              <div className={styles.header}>
                {title}
                <button
                  className={styles.closeButton}
                  onClick={() => onClose()}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className={styles.body}>{children}</div>
            </div>
          </>,
          node,
        )}
    </>
  );
}
