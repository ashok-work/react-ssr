import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const postId = parseInt(id);
  const post = useSelector((state) => 
    state.posts.posts.find(p => p.id === postId)
  );

  if (!post) {
    return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">No Post Found</h2>
    </div>
  );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>
      
      <div className="mt-6 pt-4 border-t text-sm text-gray-500">
        <p>Post ID: {post.id}</p>
        <p>Status: {useSelector(state => state.posts.status)} (Confirmed data loaded)</p>
      </div>
    </div>
  );
};

export default PostDetails;