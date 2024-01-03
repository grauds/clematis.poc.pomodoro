import React from 'react';
import { DeleteIcon, EditIcon, MenuIcon, MinusIcon, PlusIcon } from '../../../../icons';
import { noop } from '../../../../../utils/noop';
import { Dropdown } from '../../../../components/Dropdown';
import { GenericList } from '../../../../components/GenericList';
import { merge } from '../../../../../utils/merge';
import { MenuItemsList } from '../../../../components/MenuItemsList';
import { v4 as uuidv4 } from 'uuid';

import styles from './menubutton.css';

const MENU_ITEMS  = [
  {
      id: uuidv4(),
      text: 'Увеличить',
      icon: <PlusIcon />
  },
  {
      id: uuidv4(),
      text: 'Уменьшить',
      icon: <MinusIcon />
  },
  {
      id: uuidv4(),
      text: 'Редактировать',
      icon: <EditIcon />
  },
  {
      id: uuidv4(),
      text: 'Удалить',
      icon: <DeleteIcon />
  }
];

interface IMenuButtonProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function MenuButton({ isOpen, onOpen = noop, onClose = noop }: Readonly<IMenuButtonProps>) {
  
  function handleItemClick(id: string): void {
    console.log(id) // returns id of the clicked item
  }

  return ( 
    <div className={styles.menu}>
      <Dropdown isOpen={isOpen} onOpen={onOpen} onClose={onClose} button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>}
      >       
         <MenuItemsList>
            <GenericList list={MENU_ITEMS.map(merge({ onClick: handleItemClick }))} /> 
         </MenuItemsList> 
      </Dropdown>
    </div>
  );
}
