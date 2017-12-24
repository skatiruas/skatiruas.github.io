import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBar from './AppBar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><AppBar /></div>, document.getElementById('root'));
registerServiceWorker();
