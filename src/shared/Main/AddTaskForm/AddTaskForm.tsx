import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './addtaskform.css';

interface IAddTaskFormProps {
  onSubmit: (name: string) => void;
}

export function AddTaskForm({
  onSubmit,
}: Readonly<IAddTaskFormProps>): React.JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const [taskName, setTaskName] = useState('');
  const [touched, setTouched] = useState(false);
  const [valueError, setValueError] = useState('');

  useEffect(() => {
    ref.current?.focus();
    ref.current?.setSelectionRange(taskName?.length, taskName?.length);
  }, []);

  function validateValue() {
    if (taskName?.length <= 3)
      return 'Введите не меньше трех символов для новой задачи';
    return '';
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setTouched(true);
    setValueError(validateValue());

    if (isFormValid) {
      onSubmit(taskName);
    }
  }

  const isFormValid = !validateValue();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={ref}
        className={styles.input}
        value={taskName}
        onChange={handleChange}
        placeholder="Название задачи"
        aria-invalid={valueError ? 'true' : undefined}
      />
      {touched && valueError && (
        <div className={styles.error}>{valueError}</div>
      )}
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  );
}
