import { createSlice } from '@reduxjs/toolkit';

// This is our simulated initial state, typically fetched from a database.
const initialPostData = [
  { id: 1, title: 'Server-Side Rendering Explained', content: 'SSR delivers a fully rendered HTML page from the server, improving SEO and performance.' },
  { id: 2, title: 'Redux Toolkit for CRUD', content: 'RTK simplifies state management with createSlice, making CRUD logic clean and predictable.' },
  { id: 3, title: 'Hydration is Key', content: 'On the client, hydration connects the React component tree to the server-rendered DOM.' },
];

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: initialPostData,
    status: 'idle',
  },
  reducers: {
    // Action to set initial data, used primarily by the server during SSR.
    setPosts(state, action) {
      state.posts = action.payload;
      state.status = 'succeeded';
    },
    // Simple mock action for adding a post
    addPost(state, action) {
      state.posts.push({ ...action.payload, id: Date.now() });
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;