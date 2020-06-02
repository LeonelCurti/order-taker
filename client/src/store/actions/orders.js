import axios from "axios";
import {
  GET_PRICE_LIST,
  ORDERS_ERROR,
  GET_MY_ORDERS
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
      type: ORDERS_ERROR,
      payload: err.response.data.error,
    });
  }
};
export const getMyOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/order");

    dispatch({
      type: GET_MY_ORDERS,
      payload: res.data.orders,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response.data.error,
    });
  }
};
export const deleteOrder = (order_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/order/${order_id}`);    
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response.data.error,
    });
  }
};
