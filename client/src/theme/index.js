import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const primary = "#514cbc";
const secondary = "#34a57e";
const error = "#FF1654";
const background = "#fafafa";//original
// const tableRowBackground = "#F4F6F8";


const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    error: { main: error },
    background: {
      default: background,
    },
  },
  typography: {
    useNextVariants: true,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow:
          "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
      },
    },
    // MuiTableRow: {
    //   root: {
    //     "&$selected": {
    //       backgroundColor: tableRowBackground,
    //     },
    //     "&$hover": {
    //       "&:hover": {
    //         backgroundColor: tableRowBackground,
    //       },
    //     },
    //   },
    // },
  },
});

export default responsiveFontSizes(theme);
