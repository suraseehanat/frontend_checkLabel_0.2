import React, { useState } from "react";
import CropFreeIcon from "@material-ui/icons/CropFree";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "@material-ui/lab/Alert";
import * as tagscanActions from "./../../actions/tagscan.action";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function TagScan(props) {
  const classes = useStyles();
  const [inputTagScan, setTagScan] = useState("");
  const dispatch = useDispatch();
  const tagscanReducer = useSelector(({ tagscanReducer }) => tagscanReducer);
  const clearState =  () => {
    setTagScan("");
  }
  return (
    <div>
      {tagscanReducer.isError && (
        <Alert variant="filled" severity="error">
          ป้ายแท็กไม่ถูกต้อง ลองแสกนอีกครั้ง
        </Alert>
      )}
      <form
        className={classes.margin}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(tagscanActions.getTagDetail({inputTagScan, ...props }));
        }}
      >
        <TextField
          label="TAG SCAN : "
          fullWidth
          autoFocus
          value={inputTagScan}
          onChange={(e) => {
            setTagScan( e.target.value);
          }}
          id="inputTagScan"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CropFreeIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={()=>{
            clearState();
           
          }}
          variant="contained"
          className={classes.margin}
          fullWidth
          startIcon={<RefreshIcon />}
        >
          สแกนใหม่อีกครั้ง
        </Button>
      </form>
    </div>
  );
}
