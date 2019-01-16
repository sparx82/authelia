
import * as Actions from './actions';
import { ActionType, getType, StateType } from 'typesafe-actions';
import RemoteState from '../RemoteState';

export type FirstFactorAction = ActionType<typeof Actions>;

enum Result {
  NONE,
  SUCCESS,
  FAILURE,
}

interface State {
  lastResult: Result;
  loading: boolean;
  error: string | null;

  remoteState: RemoteState | null;
  remoteStateLoading: boolean;
  remoteStateError: string | null;
}

const initialState: State = {
  lastResult: Result.NONE,
  loading: false,
  error: null,
  remoteState: null,
  remoteStateLoading: false,
  remoteStateError: null,
}

export type PortalState = StateType<State>;

export default (state = initialState, action: FirstFactorAction) => {
  switch(action.type) {
    case getType(Actions.authenticate):
      return {
        ...state,
        loading: true,
        error: null
      };
    case getType(Actions.authenticateSuccess):
      return {
        ...state,
        lastResult: Result.SUCCESS,
        loading: false,
        error: null,
      };
    case getType(Actions.authenticateFailure):
      return {
        ...state,
        lastResult: Result.FAILURE,
        loading: false,
        error: action.payload,
      };

    case getType(Actions.fetchState):
      return {
        ...state,
        remoteState: null,
        remoteStateError: null,
        remoteStateLoading: true,
      };
    case getType(Actions.fetchStateSuccess):
      return {
        ...state,
        remoteState: action.payload,
        remoteStateLoading: false,
      };
    case getType(Actions.fetchStateFailure):
      return {
        ...state,
        remoteStateError: action.payload,
        remoteStateLoading: false,
      };
  }
  return state;
}