import axios from "axios";
import {
  GET_PRICE_LIST,
  ORDERS_ERROR,
  GET_MY_ORDERS,
  SET_CURRENT_ORDER,
  CLEAR_CURRENT_ORDER,
  DELETE_ORDER_ITEM
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

export const createNewOrder = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/order"); 
    
    dispatch(setCurrentOrder(res.data.order));
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response.data.error,
    });
  }
};
//test
export const updateOrder = (updatedOrder) => async (dispatch) => {
  //add or remove order items
  try {
    // await axios.post(`/api/v1/order/${order._id}`,updatedOrder);
    dispatch(setCurrentOrder(updatedOrder))     
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response.data.error,
    });
  }
}

export const setCurrentOrder = (order) => {
  return {
    type: SET_CURRENT_ORDER,
    payload: order,
  };
};
export const clearCurrentOrder = () => {
  return {
    type: CLEAR_CURRENT_ORDER,
  };
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
