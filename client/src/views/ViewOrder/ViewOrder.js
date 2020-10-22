import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
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
  Divider,
  Toolbar,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { setCurrentOrder } from "../../redux/actions/orders";
import { generateOrderPdf } from "../../utils/generatePdf";
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
  peper: {
    minHeight: 600,
  },
  tableContainer: {
    overflowX: "auto",
  },
  title: {
    flexGrow: 1,
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
  const { setCurrentOrder, currentOrder } = props;


  const handlePrintOrder = () => {  
    generateOrderPdf(currentOrder);
  };

  //willUnmount
  useEffect(() => {
    return () => {
      setCurrentOrder(null);
    };
  }, [setCurrentOrder]);

  return (
    <Layout>
      {currentOrder ? (
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.peper}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {`Order Number: ${currentOrder.number}`}
              </Typography>
              <Tooltip title="Download Pdf">
                <IconButton
                  classes={{ root: classes.icon }}
                  onClick={handlePrintOrder}
                >
                  <PictureAsPdfIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <div className={classes.tableContainer}>
              <Table size="small">
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
                  <TableRow>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography>Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>{currentOrder.total}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
