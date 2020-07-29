import * as actionTypes from "../actions/types";

const initialState = {
  msg: "",
  isOpen: false,
};
const alert = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        msg: action.payload || "Something went wrong",
        isOpen: true,
      };
    case actionTypes.CLEAR_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default alert;
