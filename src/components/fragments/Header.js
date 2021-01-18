import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import * as loginActions from "./../../actions/login.action";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ระบบตรวจสอบลาเบล
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(loginActions.logout({ ...props }));
            }}
          >
            ออกจากระบบ
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withRouter(Header);
