import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const VisibilityPasswordTextField = (props) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const onVisibilityChange = (isVisible) => {
    setPasswordIsVisible(isVisible);
  };
  return (
    <TextField
      {...props}
      type={passwordIsVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => {
                onVisibilityChange(!passwordIsVisible);
              }}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
            >
              {passwordIsVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export default VisibilityPasswordTextField;
