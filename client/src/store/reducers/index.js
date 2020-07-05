import { combineReducers } from 'redux';
import auth from './auth';
import orders from './orders';
import catalog from './products';

const rootReducer = combineReducers({
  auth,
  orders,
  catalog,
});

export default rootReducer;