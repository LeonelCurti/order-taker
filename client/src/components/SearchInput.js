import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
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
  const { className, style, onChange, placeholder } = props;

  return (
    <Paper className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        className={classes.input}
        disableUnderline
        onChange={(e) => onChange(e)}
        placeholder={placeholder ? placeholder : "Search"}
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  filterProducs: PropTypes.func,
  clearFilteredProducs: PropTypes.func,
};

export default SearchInput;
