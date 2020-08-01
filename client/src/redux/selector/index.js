import { createSelector } from "reselect";

export const loadingSelector = (state, actions) =>
  // return true if any action is true in loading piece of state
  actions.some((action) => state.loading[action]);

export const loadingSelector2 = createSelector(
  (state) => state,
  (state, actionTypes) => actionTypes,
  loadingSelector
);

export const errorMessageSelector = (actions, state) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error

  const errors = actions.map((action) => state.error[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return null;
};

//new

export const selectRawErrors = (actions, state) => {
  //Returns a new object with the keys being the action type
  //  and the value being an error msg
  //(e.g. {GET_ORDERS:'errormsg1',GET_PRODUCTS:'errormsg2'})
  return actions.reduce((partialState, actionType) => {
    const errorMsg = state.error[actionType];

    if (errorMsg) {
      partialState[actionType] = errorMsg;
    }

    return partialState;
  }, {});
};

export const errorMessageSelector2 = (actionTypes, errorState) => {
  const errorList = actionTypes.reduce((errorMessages, actionType) => {
    const message = errorState.error[actionType];

    if (message) {
      return errorMessages.concat([message]);
    }

    return errorMessages;
  }, []);

  console.log(errorList);

  if (errorList && errorList[0]) {
    return errorList[0];
  }
  return null;
};

export const hasErrors = (actions, state) =>
  actions.some((action) => state.error[action]);
