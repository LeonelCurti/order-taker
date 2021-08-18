import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@material-ui/styles";
import muiTheme from "./styles/muiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import AlertSnackbar from "./components/AlertSnackbar";
import TopLinearLoader from "./components/TopLinearLoader";
import Auth from "./components/auth/Auth";
import Routes from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Provider store={store}>
        <AlertSnackbar />
        <TopLinearLoader />
        <Auth>
          <Routes />
        </Auth>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
