import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice';

/**
 * Creates and configures the Redux store.
 * Accepts preloadedState, which is essential for SSR hydration.
 */
export const makeStore = (preloadedState) => {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState,
  });
};
