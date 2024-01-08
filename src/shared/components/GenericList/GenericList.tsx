import React from 'react';
import { noop } from '../../../utils/noop';

import styles from './genericList.css'

export interface IItem {
    id: string;
    text: string;
    icon?: React.ReactNode; 
    onClick: (id:string, e: any) => void;
    className?: string;
    As?: 'a' | 'li' | 'button' | 'div' | 'span';
    href?: string;
    disabled?: boolean;
}

interface IGenericListProps {
    list: IItem[];
}

export function GenericList({ list }: Readonly<IGenericListProps>) {
   return (
    <>
       {
          list.map(({ As = 'div', text, icon, onClick = noop, className, id, href, disabled}) => (
            <As 
               className={ className ?? styles.listItem } 
               onClick={(e) => onClick(id, e)}
               key={id}
               href={href}
               disabled={disabled}
            >
                  {icon} <span>{text}</span>
            </As>   
          ))
       }
    </>
   )
}