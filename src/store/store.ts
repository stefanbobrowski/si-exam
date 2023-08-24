import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { appSlice } from './app/slice';
import thunkMiddleware from 'redux-thunk';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
});

// QUESTION: Why would we use thunk middleware? What advantage does this give us?
// ANSWER: Thunks are a way to handle async actions. It allows us to write async logic that interacts with the store. Another way to seperate the logic from the components.
const composedEnhancer = applyMiddleware(thunkMiddleware);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [composedEnhancer],
  devTools: true,
});
