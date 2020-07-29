import * as actionTypes from "../actions/types";

export const clearAlert = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALERT,
  });
};
export const showAlert = (message) => ({
  type: actionTypes.SET_ALERT,
  payload: message,
});
