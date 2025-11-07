import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { makeStore } from './store/store';

// Retrieve the state injected by the server
const preloadedState = window.__PRELOADED_STATE__;

// Create the store using the preloaded state
const store = makeStore(preloadedState);

// We use createRoot().hydrateRoot for React 18
ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}>
    {/* BrowserRouter handles client-side navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// Clean up the global state variable
delete window.__PRELOADED_STATE__;