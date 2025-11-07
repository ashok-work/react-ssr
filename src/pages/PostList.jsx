import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost, setPosts } from '../store/postSlice'; // Example action
import axios from 'axios';

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  // Mock function to simulate adding a new post
  const handleAddPost = () => {
    dispatch(addPost({
      title: 'New Client Post: ' + (posts.length + 1),
      content: 'This post was added after client-side hydration.',
    }));
  };

  return (
    <div className="space-y-6">
  <img src='/test.jpg' style={{height: 64, width: 64}}/>
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">All Posts ({posts.length})</h2>
      
      <button 
        onClick={handleAddPost}
        className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
      >
        Add Post (Client Hydrated Test)
      </button>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
            <Link to={`/posts/${post.id}`} className="block">
              <h3 className="text-xl font-bold text-indigo-700 hover:text-indigo-500">{post.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
      
      {posts.length === 0 && <p className="text-gray-500">No posts found.</p>}
    </div>
  );
};

export default PostList;