import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBar from './AppBar';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><AppBar /><Home /></div>, document.getElementById('root'));
registerServiceWorker();
