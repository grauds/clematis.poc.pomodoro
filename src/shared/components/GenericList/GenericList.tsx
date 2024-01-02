import React from 'react';
import { noop } from '../../../utils/noop';

import styles from './genericList.css'

interface IItem {
    id: string;
    text: string;
    icon?: React.ReactNode; 
    onClick: (id: string) => void;
    className?: string;
    As?: 'a' | 'li' | 'button' | 'div' | 'span';
    href?: string;
}

interface IGenericListProps {
    list: IItem[];
}

export function GenericList({ list }: Readonly<IGenericListProps>) {
   return (
    <>
       {
          list.map(({ As = 'div', text, icon, onClick = noop, className, id, href}) => (
            <As 
               className={ className ?? styles.listItem } 
               onClick={() => onClick(id)}
               key={id}
               href={href}
            >
                  {icon} <span>{text}</span>
            </As>   
          ))
       }
    </>
   )
}