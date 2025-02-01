import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ISettings } from '@/types/model';
import { RootState } from '@/store/reducer';
import { SettingsIcon, StatsIcon } from '../../icons';
import { SettingsDialog } from '../../SettingsDialog';

import styles from './stats.css';

export function Stats(): React.JSX.Element {
  const settings = useSelector<RootState, ISettings>((state) => state.settings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Link to={`/statistics`} className={styles.stats}>
        <StatsIcon /> <div className={styles.text}>Статистика</div>
      </Link>
      <button className={styles.settings} onClick={() => setIsDialogOpen(true)}>
        <SettingsIcon /> <div className={styles.text}>Настройки</div>
      </button>
      <SettingsDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        settings={settings}
      />
    </div>
  );
}
