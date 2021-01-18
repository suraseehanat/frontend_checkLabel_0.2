import React  from "react";
import Header from "./components/fragments/Header";
import Login from "./components/pages/Login";
import LabelScan from "./components/pages/LabelScan";
import {  Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import TagScan from "./components/pages/TagScan";
import * as loginActions from "./actions/login.action";

import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(10),
  },
}));
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Redirect to="/tagscan" />
      ) : (
        <Login {...props} />
      )
    }
  />
);


export default function App() {
  const classes = useStyles();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const dispatch = useDispatch();
  React.useEffect(() =>{
    dispatch(loginActions.reLogin());
  },[])

  return (
    <Router>

      {loginReducer.result && !loginReducer.error && (<Header />) }
      <Container className={classes.content}>
      <Switch>
      <Route
            exact={true}
            path="/"
            component={() => <Redirect to="/login" />}
          />
      <LoginRoute  path="/login" component={Login} />
      <SecuredRoute  path="/tagscan" component={TagScan} />
      <SecuredRoute  path="/labelscan" component={LabelScan} />
      </Switch>
      </Container>
      
    </Router>
  );
}


