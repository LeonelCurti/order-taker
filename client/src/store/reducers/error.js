import * as actionTypes from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  if (type === actionTypes.CLEAR_ERRORS) {
    //Removes all errors by returning the initial state 
    return initialState;
  }

  if (type === actionTypes.REMOVE_ERRORS) {
    // Create a new state without the errors included in payload.
    return Object.entries(state).reduce((newState, [key, value]) => {
      if (!payload.includes(key)) {
        newState[key] = value;
      }

      return newState;
    }, {});
  }

  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === "FAIL" ? payload : null,
  };
}


