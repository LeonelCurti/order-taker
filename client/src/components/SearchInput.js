import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { changeFilterStr } from "../store/actions/orders";
import { Paper, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "4px",
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
}));

const SearchInput = (props) => {
  const classes = useStyles();
  const { changeFilterStr, className, style } = props;

  useEffect(() => {
    //componentWillUnmount
    return () => changeFilterStr("");
  });

  const onChange = (e) => {
    changeFilterStr(e.target.value.trim());
  };

  return (
    <Paper className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input className={classes.input} disableUnderline onChange={onChange} />
    </Paper>
  );
};

SearchInput.propTypes = {
  filterProducs: PropTypes.func,
  clearFilteredProducs: PropTypes.func,
};

export default connect(null, { changeFilterStr })(SearchInput);

