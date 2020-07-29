import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Container,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setCurrentOrder } from "../store/actions/orders";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "100%",
  },
  peperContainer: {
    height: "100%",
  },
  orderTableContainer: {
    overflowX: "auto",
    height: "calc(100% - 48px - 2px - 52px )",
  },
  paperTitle: {
    padding: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const MyOrders = (props) => {
  const classes = useStyles();
  const {
    setCurrentOrder, 
    currentOrder,
  } = props;

  const handlePrintOrder = () => {};

  //willUnmount
  useEffect(() => {
    return () => {
      setCurrentOrder(null);
    };
  }, [setCurrentOrder]);

  return (
    <Layout>
      {currentOrder ? (
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.peperContainer}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.paperTitle}
            >
              {`Order Number: ${currentOrder.number}`}
            </Typography>
            <Divider />
            <Box className={classes.orderTableContainer}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentOrder.items.map((product, i) => (
                    <TableRow hover key={product.cod}>
                      <TableCell align="right">{product.cod}</TableCell>
                      <TableCell>{product.descrip}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">
                        {(product.quantity * product.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Divider />
            <div className={classes.actions}>
              <Box mr={1}>
                <Typography variant="body1">
                  {`Total:  ${currentOrder.total}`}
                </Typography>
              </Box>
              <Button
                color="primary"
                variant="contained"
                onClick={handlePrintOrder}
              >
                Print
              </Button>
            </div>
          </Paper>
        </Container>
      ) : (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
});

export default connect(mapStateToProps, {
  setCurrentOrder,
})(MyOrders);
