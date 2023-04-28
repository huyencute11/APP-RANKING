import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../redux/store';

export type AppDispatch = ThunkDispatch<RootState, any, Action>;