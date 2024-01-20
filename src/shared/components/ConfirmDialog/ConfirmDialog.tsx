import React from "react";
import { Dialog } from "../Dialog";
import { noop } from "../../../utils/noop";

import styles from "./confirmdialog.css";

interface IConfirmDialogProps {
  title?: string;
  buttonTitle?: string;
  question?: string;
  isOpen?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

export function ConfirmDialog({
  title,
  question,
  buttonTitle,
  isOpen,
  onSubmit = noop,
  onClose = noop,
}: Readonly<IConfirmDialogProps>): React.JSX.Element {
  return (
    <Dialog title={title} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        {question}
        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            {buttonTitle ?? "Сохранить"}
          </button>
          <button className={styles.cancel} onClick={() => onClose()}>
            {"Отмена"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
