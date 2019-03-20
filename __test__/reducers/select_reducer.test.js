import reducer from '../../src/reducers';
import types from '../../src/actions/types';

describe('reducer', () => {
  it('initial state', () => {
    const action = { type: 'dummy_action' };
    const initialState = { userName: '', barcode: '' };

    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('LOGIN_USER', () => {
    const action = { type: types.LOGIN_USER, payload: 'raccoon' };
    const expectState = { userName: 'raccoon', barcode: '' };

    expect(reducer(undefined, action)).toEqual(expectState);
  })
});