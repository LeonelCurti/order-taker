import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { getOrders } from "../../../redux/actions/orders";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import StatusBullet from "../../../components/StatusBullet";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    // minWidth: 800,
    overflow: "auto",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
  cardHeader: {
    "& .MuiCardHeader-title": {
      fontSize: "1.2rem",
    },
    "& .MuiCardHeader-action": {
      // marginTop:0,
      // marginRight: 0,
    },
  },
}));

const statusColors = {
  received: "success",
  open: "info",
  submitted: "warning",
};

const LatestOrders = (props) => {
  const { className } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const myOrders = useSelector((state) => state.orders.myOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleCreateNewOrder = () => {
    props.history.push("/new_order");
  };
  const handleViewOrders = () => {
    props.history.push("/orders");
  };
  const renderSkeleton = () => {
    let rows = [];
    for (let i = 0; i < 4; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell colSpan={4}>
            <Skeleton />
          </TableCell>
        </TableRow>
      );
    }
    return rows;
  };

  return (
    <Card className={clsx(classes.root, className)} elevation={4}>
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleCreateNewOrder}
          >
            New order
          </Button>
        }
        className={classes.cardHeader}
        title="Latest Orders"
      />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">Nº</TableCell>
                <TableCell>Last update</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders.length > 0
                ? myOrders.slice(0, 4).map((order) => (
                    <TableRow key={order.number}>
                      <TableCell align="right">{order.number}</TableCell>
                      <TableCell>
                        {moment(order.updatedAt).format("DD/MM/YYYY  h:mm a")}
                      </TableCell>
                      <TableCell align="right">{order.total}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <StatusBullet
                            className={classes.status}
                            color={statusColors[order.state]}
                            size="sm"
                          />
                          <span>{order.state}</span>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : renderSkeleton()}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        {myOrders.length > 0 ? (
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={handleViewOrders}
          >
            View all <ArrowRightIcon />
          </Button>
        ) : (
          <Skeleton width={93} height={32} />
        )}
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

export default withRouter(LatestOrders);
