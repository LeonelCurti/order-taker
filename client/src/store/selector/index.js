export const loadingSelector = (actions, state) =>
  // return true if any action is true in loading piece of state  
  actions.some((action) => state.loading[action]);

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
