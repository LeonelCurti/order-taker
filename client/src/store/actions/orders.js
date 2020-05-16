import axios from "axios";
import {
  GET_PRICE_LIST,
  PRICE_LIST_ERROR,
  CHANGE_FILTER_STR
} from "./types";

export const getPriceList = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/pricelist");

    dispatch({
      type: GET_PRICE_LIST,
      payload: res.data.products,
    });
  } catch (err) {
    dispatch({
      type: PRICE_LIST_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const changeFilterStr = (text) => dispatch =>{
  dispatch({
    type: CHANGE_FILTER_STR,
    payload: text
  });
}
