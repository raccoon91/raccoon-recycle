import * as types from '../actions/types';
import { Action } from '../actions/index';
import { StoreState } from '../types/index';

export function reducer(state: StoreState, action: Action): StoreState {
  // const copiedState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case types.LOGIN_USER:
      // copiedState.userName = action.payload;

      // return copiedState;
      return { ...state, userName: action.payload };
    case types.BARCODE_SCAN:
      // copiedState.barcode = action.payload;

      // return copiedState;
      return { ...state, barcode: action.payload };
    default:
      return state;
  };
};