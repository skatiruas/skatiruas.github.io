import React, { ReactElement, ReactNode } from "react";
import styles from "./Section.module.css";

export const Section = ({
  greetings,
  children,
  childrenClassName,
}: {
  greetings: ReactNode;
  children: ReactNode;
  childrenClassName?: string;
}): ReactElement => (
  <div className={styles.section}>
    <div className={styles.greetings}>{greetings}</div>
    <div className={childrenClassName}>{children}</div>
  </div>
);
