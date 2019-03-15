import types from './types';

export function loginUserName(name) {
  return {
    type: types.LOGIN_USER,
    payload: name
  };
}

export function barcodeScan(barcode) {
  return {
    type: types.BARCODE_SCAN,
    payload: barcode
  };
}
