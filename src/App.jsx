import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';

const App = ({ routerProps }) => {
  return (
    <div className="container mx-auto p-4 font-sans">
      <header className="bg-indigo-600 text-white p-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold">SSR Redux Toolkit CRUD</h1>
        <nav className="mt-2">
          <Link to="/" className="text-indigo-200 hover:text-white mr-4">Home (Posts)</Link>
        </nav>
      </header>

      <main className="bg-white p-6 rounded-lg shadow-xl">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="*" element={<h2 className="text-red-500">404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
