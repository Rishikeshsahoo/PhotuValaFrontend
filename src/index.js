import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

ReactDOM.render(
  <React.Fragment>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.Fragment>,
  document.getElementById('root'),
);
