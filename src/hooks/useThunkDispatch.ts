import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '@store/index';

export const useThunkDispatch = <ActionArgsType, ActionReturnType>(): ThunkDispatch<StoreState, ActionArgsType, Action<ActionReturnType>> => {
  return useDispatch<ThunkDispatch<StoreState, ActionArgsType, Action<ActionReturnType>>>();
}