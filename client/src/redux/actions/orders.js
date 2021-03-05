import axios from "axios";
import * as actionTypes from "./types";
import { handleFail } from "../../utils/handleFail";

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ORDERS_REQUEST });
    const res = await axios.get("/api/v1/orders");
    dispatch({
      type: actionTypes.GET_ORDERS_SUCCESS,
      payload: res.data.orders,
    });
  } catch (err) {
    dispatch(handleFail(actionTypes.GET_ORDERS_FAIL, err));
  }
};

export const createOrder = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
    const res = await axios.post("/api/v1/orders/createOrder");
    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch(handleFail(actionTypes.CREATE_ORDER_FAIL, err));
  }
};

export const updateOrder = (updatedOrder) => async (dispatch) => {
  try {
    dispatch(setCurrentOrder(updatedOrder));
    dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST });
    await axios.put(`/api/v1/orders/update`, { updatedOrder });
    dispatch({ type: actionTypes.UPDATE_ORDER_SUCCESS });
  } catch (err) {
    dispatch(handleFail(actionTypes.UPDATE_ORDER_FAIL, err));
  }
};

export const submitOrder = (updatedOrder, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SUBMIT_ORDER_REQUEST });
    await axios.put(`/api/v1/orders/update`, { updatedOrder });
    setTimeout(() => {
      dispatch({ type: actionTypes.SUBMIT_ORDER_SUCCESS });
      history.replace("/orders");
    }, 1200);
  } catch (err) {
    dispatch(handleFail(actionTypes.SUBMIT_ORDER_FAIL, err));
  }
};
export const deleteOrder = (order_id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_ORDER_REQUEST });
    await axios.delete(`/api/v1/orders/${order_id}`);
    dispatch({
      type: actionTypes.DELETE_ORDER_SUCCESS,
      payload: order_id,
    });
  } catch (err) {
    dispatch(handleFail(actionTypes.DELETE_ORDER_FAIL, err));
  }
};

export const setCurrentOrder = (order) => ({
  type: actionTypes.SET_CURRENT_ORDER,
  payload: order,
});
