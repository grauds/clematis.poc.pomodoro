import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog } from "../Dialog";
import { noop } from "../../../utils/noop";

import styles from "./inputdialog.css";

interface IInputDialogProps {
  title?: string;
  text: string;
  isOpen?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (text: string) => void;
  onValidate: (text: string) => string;
  onClose?: () => void;
}

export function InputDialog({
  title,
  text,
  isOpen,
  onChange,
  onSubmit,
  onValidate,
  onClose = noop,
}: Readonly<IInputDialogProps>) {
  const ref = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState(text);
  const [touched, setTouched] = useState(false);
  const [valueError, setValueError] = useState("");

  useEffect(() => {
    ref.current?.focus();
    ref.current?.setSelectionRange(input?.length, input?.length);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    onChange(event);
  }

  function validateValue(): string {
    return onValidate(input);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setTouched(true);
    setValueError(validateValue());

    if (isFormValid) {
      onSubmit(input);
    }
  }

  const isFormValid = !validateValue();

  return (
    <Dialog title={title} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={ref}
          type="text"
          className={styles.input}
          onChange={handleChange}
          value={input}
        />
        {touched && valueError && (
          <div className={styles.error}>{valueError}</div>
        )}
        <button type="submit" className={styles.button}>
          {"Сохранить"}
        </button>
        <button className={styles.cancel} onClick={() => onClose()}>
          {"Отмена"}
        </button>
      </form>
    </Dialog>
  );
}
