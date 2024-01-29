import React, {
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "../components/Dialog";
import { EInputRowType, InputRow } from "./InputRow";
import { ISettings, defaultSettings } from "../../types/model";
import { updateSettings } from "../../store/reducer";
import { noop } from "../../utils/noop";

import styles from "./settingsdialog.css";
import {ThemeSwitcher} from "../components/ThemeSwitcher";

interface ISettingsDialog {
  settings: ISettings;
  isOpen?: boolean;
  onClose?: () => void;
}

export function SettingsDialog({
  settings,
  isOpen,
  onClose = noop,
}: Readonly<ISettingsDialog>): React.JSX.Element {
  
  const dispatch = useDispatch();
  const [settingsCopy, setSettingsCopy] = useState<ISettings>(settings)
  const [defaults, setDefaults] = useState<boolean>(false)

  useEffect(() => {

    if (defaults) {
      setSettingsCopy({...defaultSettings})
      dispatch(updateSettings(defaultSettings))
      setDefaults(false)
    }

  }, [defaults])

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(updateSettings(settingsCopy))
    onClose()
  }

  function handleDefaults(event: FormEvent) {
    event.preventDefault();
    setDefaults(true)
  }

  return (
    <Dialog title={"Настройки"} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
          <legend>Тема</legend>
          <div className={styles.theme}>
            <ThemeSwitcher leftTitle={'Светлая'} centerTitle={'Авто'} rightTitle={'Темная'} />
          </div>
        </fieldset>
        <fieldset>
          <legend>Продолжительность</legend>
          <InputRow
            id={"time"}
            label={"Один помидор"}
            name={"time"}
            onChange={(value: boolean | number) => {
              setSettingsCopy({
                ...settingsCopy,
                pomodoro: value as number,
              });
            }}
            value={settingsCopy?.pomodoro}
          />
          <InputRow
            id={"break"}
            label={"Короткий перерыв"}
            name={"break"}
            onChange={(value: boolean | number) => {
              setSettingsCopy({
                ...settingsCopy,
                break: value as number,
              });
            }}
            value={settingsCopy?.break}
          />
          <InputRow
            id={"long_break"}
            label={"Длинный перерыв"}
            name={"long_break"}
            onChange={(value: boolean | number) => {
              setSettingsCopy({
                ...settingsCopy,
                longBreak: value as number,
              });
            }}
            value={settingsCopy?.longBreak}
          />
        </fieldset>
        <fieldset>
          <legend>Дополнительно</legend>
          <InputRow
            id={"long_break_after"}
            label={"Длинный перерыв после помидоров"}
            name={"long_break_after"}
            onChange={(value: boolean | number) => {
              setSettingsCopy({
                ...settingsCopy,
                longBreakAfterPomodoro: value as number,
              });
            }}
            value={settingsCopy?.longBreakAfterPomodoro}
            type={EInputRowType.NUMBERS}
          />
          <InputRow
            id={"notifications"}
            type={EInputRowType.CHECKBOX}
            label={"Уведомления об окончании таймера"}
            name={"notifications"}
            onChange={(value: boolean | number) => {
              setSettingsCopy({
                ...settingsCopy,
                soundOn: value ? value as boolean : false,
              });
            }}
            value={settingsCopy.soundOn}
          />
        </fieldset>
        <button type="submit" className={styles.button}>
          {"Сохранить"}
        </button>
        <button
          className={styles.defaults}
          onClick={(event: FormEvent) => handleDefaults(event)}
        >
          {"По умолчанию"}
        </button>
        <button className={styles.cancel} onClick={() => onClose()}>
          {"Закрыть"}
        </button>
      </form>
    </Dialog>
  );
}
