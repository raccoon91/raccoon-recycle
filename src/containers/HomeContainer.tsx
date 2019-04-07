import HomeScreen from '../components/HomeScreen';
import { StoreState } from '../types';
import { loginUserName, Action } from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export const mapStateToProps = (state: StoreState) => ({
  username: state.userName
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  saveloginUserName: (name: string) => {
    dispatch(loginUserName(name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);