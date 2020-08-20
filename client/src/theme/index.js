import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const white = '#FFFFFF';
const black = '#000000';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#514cbc" },
    secondary: { main: "#34a57e" },
    error: { main:"#FF1654" },
    background: {  default: "#f5f7fb" },
    white,
    black
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
          "0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)",
      },
    }, 
    MuiTableCell: {/*white background tablehead when sticky*/
      stickyHeader: {
        backgroundColor: white
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
