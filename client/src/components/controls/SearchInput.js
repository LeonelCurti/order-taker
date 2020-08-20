import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    // flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
  },
}));

const SearchInput = (props) => {
  const classes = useStyles();
  const { className, style, onChange, placeholder } = props;

  return (
    <div className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        className={classes.input}
        disableUnderline
        onChange={(e) => onChange(e)}
        placeholder={placeholder ? placeholder : "Search"}
      />
    </div>
  );
};

SearchInput.propTypes = {
  filterProducs: PropTypes.func,
  clearFilteredProducs: PropTypes.func,
};

export default SearchInput;
