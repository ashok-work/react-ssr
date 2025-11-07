import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import App from '../src/App';
import { makeStore } from '../src/store/store';
import { setPosts } from '../src/store/postSlice';
import axios from 'axios';

const app = express();
const PORT = 3000;

// Mock API endpoint to simulate data fetching
const mockFetchPosts = async () => {
  // In a real app, this would be a database call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 101, title: 'SSR Data Load Test', content: 'This content was loaded on the server side!' },
        { id: 102, title: 'Performance Boost', content: 'Sending the HTML upfront reduces client work.' },
      ]);
    }, 50);
  });
};

// Serve static assets from the client build folder
app.use(express.static('dist'));

// The main SSR handler
app.get('*', async (req, res) => {
  // 1. DATA FETCHING: Fetch data before rendering
  const initialData = await mockFetchPosts();

  const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');

  // 2. REDUX INITIALIZATION: Create a fresh store for each request
  const store = makeStore();
  store.dispatch(setPosts(resp.data));

  // Get the state right after pre-loading the data
  const preloadedState = store.getState();

  // 3. SSR RENDERING: Use StaticRouter for server-side routing
    // Debug: Log preloaded state
    console.log('SSR preloadedState:', preloadedState);
    const htmlContent = renderToString(
    <Provider store={store}>
      {/* StaticRouter handles the request URL (req.url) */}
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // 4. RESPONSE TEMPLATE: Inject HTML content and preloaded state
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Redux SSR CRUD</title>
        <!-- Tailwind CSS CDN for styling -->
        <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
        <style>body { background-color: #f1f5f9; }</style>
    </head>
    <body>
        <div id="root">${htmlContent}</div>
        
        <!-- CRITICAL STEP: Inject preloaded Redux state -->
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>

        <!-- Load the client-side JavaScript bundle -->
        <script src="/client.bundle.js"></script>
    </body>
    </html>
  `;

  res.send(htmlTemplate);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});