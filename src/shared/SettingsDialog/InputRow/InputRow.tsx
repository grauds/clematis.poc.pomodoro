import React, { ChangeEvent, useEffect, useState } from "react";
import { noop } from "../../../utils/noop";

import styles from "./inputrow.css";

export enum EInputRowType {
  MINUTES,
  NUMBERS,
  CHECKBOX
}

interface IInputRow {
  id: string;
  label: string;
  name: string;
  value: number | boolean;
  type?: EInputRowType;
  onChange?: (value: number | boolean) => void;
}

export function InputRow({
  id,
  label,
  name,
  value,
  onChange = noop,
  type = EInputRowType.MINUTES,
}: Readonly<IInputRow>): React.JSX.Element {
  let body;

  const [valueCopy, setValueCopy] = useState<number | boolean>(propsToState(value));

  // if property changes the state is not updated automatically!
  useEffect(() => {
    setValueCopy(propsToState(value)); 
  }, [value])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // refresh state with raw value
    setValueCopy(eventToState(event));    
    // give away a scaled value for numbers
    onChange(eventToCallback(event));
  }

  function propsToState(value: number | boolean): number | boolean {
    switch (type) {
      case EInputRowType.CHECKBOX:
        return value;
      case EInputRowType.MINUTES:
        return Math.floor((value as number) / 60);
      default:
        return value;
    }
  }

  function eventToState(
    event: ChangeEvent<HTMLInputElement>
  ): number | boolean {
    switch (type) {
      case EInputRowType.CHECKBOX:
        return event.target.checked;
      case EInputRowType.MINUTES:
        return Number.parseInt(event.target.value);
      default:
        return Number.parseInt(event.target.value);
    }
  }

  function eventToCallback(
    event: ChangeEvent<HTMLInputElement>
  ): number | boolean {
    switch (type) {
      case EInputRowType.CHECKBOX:
        return event.target.checked;
      case EInputRowType.MINUTES:
        return Number.parseInt(event.target.value) * 60;
      default:
        return Number.parseInt(event.target.value);
    }
  }

  switch (type) {
    case EInputRowType.MINUTES:
      body = (
        <>
          <input
            type="number"
            min="1"
            id={id}
            name={name}
            value={valueCopy as number}
            onChange={handleChange}
            className={styles.input}
          />
          <span>мин</span>
        </>
      );
      break;
    case EInputRowType.NUMBERS:
      body = (
        <input
          type="number"
          min="1"
          id={id}
          name={name}
          value={valueCopy as number}
          onChange={handleChange}
          className={styles.input}
        />
      );
      break;
    case EInputRowType.CHECKBOX:
      body = (
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={valueCopy as boolean}
          onChange={handleChange}
          className={styles.input}
        />
      );
      break;
  }

  return (
    <div className={styles.inputrow} key={`row_${id}`}>
      <label htmlFor={id}>{label}</label>
      {body}
    </div>
  );
}
