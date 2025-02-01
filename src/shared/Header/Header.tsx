import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Title } from './Title';

import styles from './header.less';
import { Stats } from './Stats';

function HeaderComponent(): React.JSX.Element {
  return (
    <header className={styles.header}>
      <Title />
      <Stats />
    </header>
  );
}

export const Header = hot(HeaderComponent);
