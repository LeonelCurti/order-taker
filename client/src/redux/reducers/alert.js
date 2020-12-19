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
    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        msg: "Order deleted.",
        isOpen: true,
      };
    case actionTypes.DELETE_ORDER_FAIL:
      return {
        msg: "Order could not be deleted.",
        isOpen: true,
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      return {
        msg: "Order submitted.",
        isOpen: true,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        msg: "User successfully registered.",
        isOpen: true,
      };
    case actionTypes.SUBMIT_ORDER_FAIL:
      return {
        msg: "Order could not be submitted.",
        isOpen: true,
      };
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        msg: "Order could not be saved.",
        isOpen: true,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        msg: "Order could not be created.",
        isOpen: true,
      };
    default:
      return state;
  }
};

export default alert;
