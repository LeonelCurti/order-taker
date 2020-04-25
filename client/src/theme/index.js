import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const primary = "#514cbc";
const secondary = "#34a57e";
const error = "#FF1654";

const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },   
    error: { main: error },   
  },
  typography: {
    useNextVariants: true,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default responsiveFontSizes(theme);
