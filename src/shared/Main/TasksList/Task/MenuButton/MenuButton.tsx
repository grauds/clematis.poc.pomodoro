import React from "react";
import { MenuIcon } from "../../../../icons";
import { noop } from "../../../../../utils/noop";
import { Dropdown } from "../../../../components/Dropdown";
import { GenericList, IItem } from "../../../../components/GenericList";
import { MenuItemsList } from "../../../../components/MenuItemsList";

import styles from "./menubutton.css";

interface IMenuButtonProps {
  isOpen?: boolean;
  menuItems: IItem[];
  onOpen?: () => void;
  onClose?: () => void;
}

export function MenuButton({
  isOpen,
  menuItems,
  onOpen = noop,
  onClose = noop,
}: Readonly<IMenuButtonProps>) {
  return (
    <div className={styles.menu}>
      <Dropdown
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>
        }
      >
        <MenuItemsList>
          <GenericList list={menuItems} />
        </MenuItemsList>
      </Dropdown>
    </div>
  );
}
