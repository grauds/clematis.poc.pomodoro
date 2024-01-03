import React from "react";
import { HomeIcon } from "../../icons/HomeIcon";
import { Link } from "react-router-dom";

import styles from "./title.css";

export function Title() {
  return (
      <Link to={`/`} className={styles.title}>
        <HomeIcon /> <div className={styles.brand}>pomodoro_box</div>
      </Link>
  );
}
