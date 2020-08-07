import axios from "axios";
import * as actionTypes from "./types";
import {handleFail} from '../../utils/handleFail'

export const getPriceList = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRICE_LIST_REQUEST });
    const res = await axios.get("/api/v1/pricelist");
    dispatch({
      type: actionTypes.GET_PRICE_LIST_SUCCESS,
      payload: res.data.products,
    });
  } catch (err) {
    dispatch(handleFail(actionTypes.GET_PRICE_LIST_FAIL, err));   
  }
};
