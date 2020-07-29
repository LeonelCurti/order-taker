import * as actionTypes from "./types";

export const removeErrors = (errorTypes) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_ERRORS,
    payload: errorTypes,
  });
};

export const clearAllErrors = (errorTypes) => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ERRORS,
    payload: errorTypes,
  });
};