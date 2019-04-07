import * as types from './types';

export interface LoginUserName {
  type: types.LOGIN_USER;
  payload: string;
}

export interface BarcodeScan {
  type: types.BARCODE_SCAN;
  payload: string;
}

export type Action = LoginUserName | BarcodeScan;
// export type LoginUserNameAction = LoginUserName;
// export type BarcodeScanAction = BarcodeScan;

export function loginUserName(name: string): LoginUserName {
  return {
    type: types.LOGIN_USER,
    payload: name
  };
}

export function barcodeScan(barcode: string): BarcodeScan {
  return {
    type: types.BARCODE_SCAN,
    payload: barcode
  };
}
