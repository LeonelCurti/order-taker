import * as actionTypes from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

 if (type === actionTypes.CLEAR_ERRORS) {

    const newState={...state}
    for(let prop in newState){
      if(payload.includes(prop))
        newState[prop]= null;
      }  
    return newState;
  }
  // if (type === actionTypes.CLEAR_ERRORS) { 
  //   return initialState;
  // }

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
