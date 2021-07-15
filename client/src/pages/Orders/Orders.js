import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  Container,
  Paper,
  Hidden,
  Toolbar,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getOrders,
  deleteOrder,
  setCurrentOrder,
} from "../../redux/actions/orders";
import PageHeader from "../../components/PageHeader";
import ErrorBoundary from "../../components/ErrorBoundary";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import OrdersTable from "./components/OrdersTable";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const Orders = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myOrders = useSelector((state) => state.orders.myOrders);
  const isFetchingOrders = useSelector((state) => state.orders.isFetching);
  const errorGetOrders = useSelector((state) => state.orders.errorMessage);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleDeleteTargetDialogClose = () => {
    setConfirmDialogOpen(false);
    setDeleteTarget(null);
  };
  const handleDeleteTargetDialogOpen = (order) => {
    setConfirmDialogOpen(true);
    setDeleteTarget(order);
  };
  const handleEditOrder = (order) => {
    dispatch(setCurrentOrder(order));
    props.history.push("/new_order");
  };
  const handleViewOrder = (order) => {
    dispatch(setCurrentOrder(order));
    props.history.push("/orders/view_order");
  };
  const handleCreateNewOrder = () => {
    props.history.push("/new_order");
  };

  const handleDeleteOrder = () => {
    setConfirmDialogOpen(false);
    dispatch(deleteOrder(deleteTarget._id));
    setDeleteTarget(null);
  };

  const onRetry = () => dispatch(getOrders());

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingOrders}>
        <ErrorBoundary
          error={errorGetOrders}
          onRetry={onRetry}
          message="We could not load resources."
        >
          <ConfirmationDialog
            open={confirmDialogOpen}
            title="Confirmation"
            content={
              <span>
                {"Do you really want to remove order number "}
                <b>{deleteTarget && deleteTarget.number}</b>
                {" from your list?"}
              </span>
            }
            onClose={handleDeleteTargetDialogClose}
            onConfirm={handleDeleteOrder}
          />
          <Container maxWidth="lg" className={classes.container}>
            <Hidden lgUp>
              <PageHeader title="Orders" />
            </Hidden>

            <Paper elevation={2}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Orders
                </Typography>
                <Button
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={handleCreateNewOrder}
                >
                  New order
                </Button>
              </Toolbar>
              <Divider />
              <OrdersTable
                orders={myOrders}
                onEditOrder={handleEditOrder}
                onViewOrder={handleViewOrder}
                onDeleteOrder={handleDeleteTargetDialogOpen}
              />
            </Paper>
          </Container>
        </ErrorBoundary>
      </LoadingIndicator>
    </Layout>
  );
};

export default Orders;
