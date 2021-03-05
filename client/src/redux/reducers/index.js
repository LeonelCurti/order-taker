import { combineReducers } from 'redux';
import auth from './auth';
import orders from './orders';
import catalog from './products';
import alert from './alert';

const rootReducer = combineReducers({
  auth,
  orders,
  catalog,
  alert,
});

export default rootReducer;