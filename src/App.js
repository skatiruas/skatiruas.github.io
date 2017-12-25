import React from 'react';
import { Element } from 'react-scroll'
import styles from './App.css';
import AppBar from './AppBar';
import Home from './Home';

const elements = {
  Home: <Home />,
  Projects: null,
  Personal: null,
  Contact: null,
}

const linkedElement = key => <Element key={key} name={key}>{elements[key]}</Element>

const App = () => (
  <div className={styles.holder}>
    <AppBar />
    <div className={styles.sections}>
      {Object.keys(elements).map(linkedElement)}
    </div>
  </div>
)

export default App
