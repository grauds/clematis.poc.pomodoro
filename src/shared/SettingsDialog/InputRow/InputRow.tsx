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
  value: number;
  type?: EInputRowType;
  onChange?: (value: number) => void;
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

  const prop = type === EInputRowType.MINUTES ? Math.floor(value / 60) : value 
  const [valueCopy, setValueCopy] = useState<number>(prop);

  // if property changes the state is not updated automatically!
  useEffect(() => {
    setValueCopy(prop) 
  }, [value])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // refresh state with raw value
    const value = Number.parseInt(event.target.value);    
    setValueCopy(value);    
    // give away a scaled value
    const result = type === EInputRowType.MINUTES ? value * 60 : value
    onChange(result);
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
            value={valueCopy}
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
          value={valueCopy}
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
          value={valueCopy}
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
