import ConfirmModal from '../components/ConfirmModal';
import { StoreState } from '../types';
import { connect } from 'react-redux';

export const mapStateToProps = (state: StoreState) => ({
  username: state.userName,
  barcode: state.barcode
});

export default connect(mapStateToProps)(ConfirmModal);