import BarcodeScannerScreen from '../components/BarcodeScannerScreen';
import { barcodeScan, Action } from '../actions';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  saveBarcode: (barcode: string) => {
    dispatch(barcodeScan(barcode));
  }
});

export default connect(null, mapDispatchToProps)(withNavigationFocus(BarcodeScannerScreen));