import React from "react";
import { StatsIcon } from "../../icons";
import { Link } from "react-router-dom";

import styles from "./stats.css";

export function Stats() {
  return (
      <Link to={`/statistics`} className={styles.stats}>
        <StatsIcon /> <div className={styles.text}>Статистика</div>
      </Link>
  );
}
