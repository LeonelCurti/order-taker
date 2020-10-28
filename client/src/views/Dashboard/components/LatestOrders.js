import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
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

const mockData = [
  {
    notes: "",
    state: "submitted",
    number: 170,
    createdAt: "2020-08-06T00:52:29.127Z",
    updatedAt: "2020-08-06T00:52:46.867Z",
    id: 2,
    amount: 10.99,
    total: 8953,
  },
  {
    notes: "",
    state: "received",
    number: 169,
    createdAt: "2020-07-22T00:52:29.127Z",
    updatedAt: "2020-07-22T00:52:46.867Z",
    id: 2,
    amount: 10.99,
    total: 476,
  },
  {
    notes: "",
    state: "received",
    number: 168,
    createdAt: "2020-06-14T00:52:29.127Z",
    updatedAt: "2020-06-14T00:52:46.867Z",
    id: 2,
    amount: 10.99,
    total: 768.57,
  },
  {
    notes: "",
    state: "received",
    number: 167,
    createdAt: "2020-06-14T00:52:29.127Z",
    updatedAt: "2020-06-14T00:52:46.867Z",
    id: 2,
    amount: 10.99,
    total: 4225,
  },
];

const statusColors = {
  received: "success",
  open: "info",
  submitted: "warning",
};

const LatestOrders = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(mockData);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={          
          <Button color="primary" size="small" variant="outlined">
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
              {orders.map((order) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>    
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

export default LatestOrders;
