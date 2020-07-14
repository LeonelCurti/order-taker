import axios from "axios";
import * as actionTypes from "./types";

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ORDERS_REQUEST,
    });
    const res = await axios.get("/api/v1/order");
    dispatch({
      type: actionTypes.GET_ORDERS_SUCCESS,
      payload: res.data.orders,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.GET_ORDERS_FAIL,
      payload: err.response.data.error || "Something went wrong",
    });
  }
};

export const createOrder = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
    const res = await axios.post("/api/v1/order/createOrder");
    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.CREATE_ORDER_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const updateOrder = (updatedOrder) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST });
    await axios.put(`/api/v1/order/update`, { updatedOrder });
    dispatch({ type: actionTypes.UPDATE_ORDER_SUCCESS });
  } catch (err) {
    dispatch({
      type: actionTypes.UPDATE_ORDER_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const submitOrder = (updatedOrder, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SUBMIT_ORDER_REQUEST });
    await axios.put(`/api/v1/order/update`, { updatedOrder });
    setTimeout(() => {
      dispatch({
        type: actionTypes.SUBMIT_ORDER_SUCCESS,
      });
      history.push("/my_orders");
    }, 1500);
  } catch (err) {
    dispatch({
      type: actionTypes.SUBMIT_ORDER_FAIL,
      payload: err.response.data.error,
    });
  }
};
export const deleteOrder = (order_id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_ORDER_REQUEST });
    await axios.delete(`/api/v1/order/${order_id}`);
    dispatch({
      type: actionTypes.DELETE_ORDER_SUCCESS,
      payload: order_id,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.DELETE_ORDER_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const setCurrentOrder = (order) => ({
  type: actionTypes.SET_CURRENT_ORDER,
  payload: order,
});
