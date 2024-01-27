import React, { useLayoutEffect } from 'react';
import { ETheme } from '../../../types/model';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

import styles from "./layout.less";

interface ILayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: Readonly<ILayoutProps>): React.JSX.Element {

  const theme = useSelector<RootState, ETheme>((state) => state.theme);

  const themeDark = "themeDark";
  const themeLight = "themeLight";
  const themeSystem = "themeSystem";

  useLayoutEffect(() => {
    if (theme === ETheme.LIGHT) {
      document.documentElement.classList.remove(themeDark);
      document.documentElement.classList.add(themeLight);
      document.documentElement.classList.remove(themeSystem); 
    } else if (theme === ETheme.DARK) {
      document.documentElement.classList.remove(themeLight);
      document.documentElement.classList.add(themeDark);  
      document.documentElement.classList.remove(themeSystem); 
    } else {
      document.documentElement.classList.remove(themeLight); 
      document.documentElement.classList.remove(themeDark);  
      document.documentElement.classList.add(themeSystem);         
    }
  }, [theme]);

  return <div className={styles.layout}>{children}</div>;
}
