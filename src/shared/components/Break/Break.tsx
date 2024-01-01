import React from 'react';
import styles from './break.css';
import { TSizes } from '../../../utils/constants';
import classNames from 'classnames';

interface IBreakProps {
   inline: boolean;
   top: boolean;
   size: TSizes;
   mobileSize?: TSizes;
   tabletSize?: TSizes;
   desktopSize?: TSizes;
}
export function Break(props: Readonly<IBreakProps>) {
  const {
    inline = false,
    top = false,
    size,
    mobileSize, 
    tabletSize,
    desktopSize
  } = props;

  return (
     <div
       className={classNames(
        styles[`s${size}`], 
        { [styles[`mobile_s${mobileSize}`]]: mobileSize }, 
        { [styles[`tablet_t${tabletSize}`]]: tabletSize }, 
        { [styles[`desktop_s${desktopSize}`]]: desktopSize },
        { [styles.inline]: inline }, 
        { [styles.top]: top }, 
       )}
     ></div>
      
  );
}
