import React from 'react';
import { DeleteIcon, EditIcon, MenuIcon, MinusIcon, PlusIcon } from '../../../../icons';
import { noop } from '../../../../../utils/noop';
import { Dropdown } from '../../../../components/Dropdown';
import { GenericList } from '../../../../components/GenericList';
import { merge } from '../../../../../utils/merge';
import { assignId } from '../../../../../utils/generateRandomIndex';

import styles from './menubutton.css';

const MENU_ITEMS  = [
  {
      text: 'Увеличить',
      icon: <PlusIcon />
  },
  {
      text: 'Уменьшить',
      icon: <MinusIcon />
  },
  {
      text: 'Редактировать',
      icon: <EditIcon />
  },
  {
      text: 'Удалить',
      icon: <DeleteIcon />
  }
].map(assignId);

interface IMenuButtonProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function MenuButton({ isOpen, onOpen = noop, onClose = noop }: Readonly<IMenuButtonProps>) {
  
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  function handleItemClick(id: string): void {
    console.log(id); // returns id of the clicked item
  }

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return ( 
    <div className={styles.menu}>  
      <button className={styles.menuButton}  onClick={handleOpen}>
        <MenuIcon />
      </button>
      {isDropdownOpen && (
        <Dropdown onClose={() => {
          setIsDropdownOpen(false);
        }}
        >
          <GenericList
            list={MENU_ITEMS.map(merge({ onClick: handleItemClick }))}
          />
        </Dropdown>
      )}
    </div>
  );
}
