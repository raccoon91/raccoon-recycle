import types from '../actions/types';

const initialState = {
  userName: '',
  barcode: ''
};

export default (state = initialState, action) => {
  const copiedState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case types.LOGIN_USER:
      copiedState.userName = action.payload;

      return copiedState;
    case types.BARCODE_SCAN:
      copiedState.barcode = action.payload;

      return copiedState;
    default:
      return state;
  };
};