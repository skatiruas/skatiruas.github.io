import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme.js';
import './toolbox/theme.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, document.getElementById('root'));
registerServiceWorker();
