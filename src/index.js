import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {InitialDataContext} from './InitialDataContext'

// const root = ReactDOM.createRoot(document.getElementById('root'));
const preloadedData = (window && window.preloadedData) || { _data: {}}
ReactDOM.hydrate(
  <React.StrictMode>
    <InitialDataContext.Provider value={preloadedData}>
      <App />
    </InitialDataContext.Provider>    
  </React.StrictMode>
  ,
  document.getElementById('root')
);

