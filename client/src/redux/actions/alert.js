import * as actionTypes from "./types";

export const clearAlert = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALERT,
  });
};
export const showAlert = (message) => ({
  type: actionTypes.SET_ALERT,
  payload: message,
});
