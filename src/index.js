import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Prompt from "./fonts/Prompt/Prompt-Light.ttf";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import logger from "redux-logger";

var middlewares = (middlewares = applyMiddleware(thunk, logger));

const store = createStore(reducers, middlewares);

const theme = createMuiTheme({
  typography: {
    fontFamily: "Prompt",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [Prompt],
      },
    },
  },
  palette: {
    primary: {
      light: '#354A5F',
      main: '#0A6ED1',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
