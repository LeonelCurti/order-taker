import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [reduxThunk];
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
