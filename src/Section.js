import React from 'react';
import styles from './Section.module.css'

const Section = ({ greetings, children, childrenClassName }) => (
  <div className={styles.section}>
    <div className={styles.greetings}>{greetings}</div>
    <div className={childrenClassName}>{children}</div>
  </div>
)

export default Section
