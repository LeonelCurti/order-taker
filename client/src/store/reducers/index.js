import { combineReducers } from 'redux';
import auth from './auth';
import orders from './orders';
import catalog from './products';
import loading from './loading';
import error from './error';

const rootReducer = combineReducers({
  auth,
  orders,
  catalog,
  loading,
  error,
});

export default rootReducer;