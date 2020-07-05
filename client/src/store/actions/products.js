import axios from "axios";
import * as actionTypes from "./types";

export const getPriceList = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRICE_LIST_START });
    const res = await axios.get("/api/v1/pricelist");
    dispatch({
      type: actionTypes.GET_PRICE_LIST_SUCCESS,
      payload: res.data.products,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_PRICE_LIST_FAIL,
      payload: err.response.data.error,
    });
  }
};
