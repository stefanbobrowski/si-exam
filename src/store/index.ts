import { CombinedState } from '@reduxjs/toolkit';
import { AppState } from './app/slice';

export type StoreState = CombinedState<{
  app: AppState;
}>;

export const selectRootState = (state: StoreState) => state;