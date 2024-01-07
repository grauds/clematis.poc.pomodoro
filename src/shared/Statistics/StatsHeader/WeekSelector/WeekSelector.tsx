import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dropdown } from "../../../components/Dropdown";
import { GenericList } from "../../../components/GenericList";
import { merge } from "../../../../utils/merge";
import { ArrowIcon } from "../../../icons";
import { IWeek, Weeks } from "../../../../types/model";
import { RootState, setCurrentWeek } from "../../../../store/reducer";

import styles from "./weekselector.css";

interface IWeekSelectorProps {
  isOpen?: boolean;
}

export function WeekSelector({ isOpen }: Readonly<IWeekSelectorProps>) {
  const [open, setOpen] = useState<boolean>(isOpen ?? false);
  const selectedWeek = useSelector<RootState, IWeek>((state) => state.week);
  const dispatch = useDispatch();

  function onOpen() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  function handleItemClick(id: string): void {
    dispatch(
      setCurrentWeek(
        Weeks.find((item: { id: string; text: string }) => {
          return item.id === id;
        }) ?? Weeks[0]
      )
    );
  }

  return (
    <div className={styles.weekselector}>
      <Dropdown
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        button={
          <button className={styles.button}>
            <span>{selectedWeek?.text}</span>
            <span className={open ? styles.arrowOpen : styles.arrow}>
              <ArrowIcon />
            </span>
          </button>
        }
      >
        <div className={styles.decoration}>
          <GenericList
            list={Weeks.filter((week: IWeek) => {
              return week.id !== selectedWeek?.id;
            }).map(
              merge({
                onClick: handleItemClick,
                className: styles.item,
              })
            )}
          />
        </div>
      </Dropdown>
    </div>
  );
}
