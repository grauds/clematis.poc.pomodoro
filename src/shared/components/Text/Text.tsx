import React from 'react';
import styles from './text.css';
import classNames from 'classnames';
import { TSizes } from '../../../utils/constants';

export enum EColors {
  black = 'black',
  orange = 'orange',
  green = 'green',
  white = 'white',
  grayF4 = 'grayF4',
  grayF3 = 'grayF3',
  grayD9 = 'grayD9',
  grayC4 = 'grayC4',
  gray99 = 'gray99',
  gray66 = 'gray66',
}

interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children?: React.ReactNode;
  size: TSizes;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desktopSize?: TSizes;
  color?: EColors;
  bold?: boolean;
}

export function Text(props: Readonly<ITextProps>) {
  const {
    As = 'span',
    color = EColors.black,
    bold = false,
    children,
    size,
    mobileSize,
    desktopSize,
    tabletSize,
  } = props;

  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    { [styles.bold]: bold },
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
  );

  return <As className={classes}>{children}</As>;
}
