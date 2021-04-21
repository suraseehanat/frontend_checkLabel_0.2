import React from "react";
import axios from "axios";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import * as tagscanActions from "./../../actions/tagscan.action";
import * as labelscanActions from "./../../actions/labelscan.action";
import {
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
  },
  button: {
    margin: theme.spacing(0, 0, 2),
  },
}));
export default function LabelScan(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const tagscanReducer = useSelector(({ tagscanReducer }) => tagscanReducer);
  const labelscanReducer = useSelector(
    ({ labelscanReducer }) => labelscanReducer
  );
  const loginReducer = useSelector(({loginReducer}) => loginReducer);
  console.log(tagscanReducer.result);
  console.log(loginReducer.result);
  const [inputBarcode, setBarcode] = React.useState();
  const [inputBarcode2,setBarcode2] = React.useState();
  const handleSave = async () => {
    const data = await axios.post("/apis/saveCheck", {
      mblnr: tagscanReducer.result[0].MBLNR,
      werks: 1100,
      aufnr: tagscanReducer.result[0].AUFNR,
      matnr: tagscanReducer.result[0].MATNR,
      charg: tagscanReducer.result[0].CHARG,
      zreqty: tagscanReducer.result[0].MENGE,
      meins: tagscanReducer.result[0].MEINS,
      zscqty: labelscanReducer.countScan,
      zlbgood: labelscanReducer.countCorrect,
      zlbwaste: labelscanReducer.countInCorrect,
      bname: loginReducer.result.username,
      zdatchk: moment().format("YYYYMMDD"),
    });
    dispatch(labelscanActions.count_clear({ ...props }));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const alertOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><Alert variant="filled" severity="error">
         ระบบแจ้งเตือน
        </Alert></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ป้ายลาเบลไม่ถูกต้อง กรุณาตรวจสอบ เลข Barcode ที่แสกนได้ : {inputBarcode2}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleClose} color="primary" autoFocus>
           รับทราบ
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ป้ายชี้บ่งผลิตภัณฑ์
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Material Code : {tagscanReducer.result[0].MBLNR}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {tagscanReducer.result[0].MAKTX}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Lot No. : {tagscanReducer.result[0].CHARG}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Barcode : {tagscanReducer.result[0].EAN11}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            จำนวนสินค้า : {tagscanReducer.result[0].MENGE}{" "}
            {tagscanReducer.result[0].MEINS}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            จำนวนที่แสกนเช็ค : {labelscanReducer.countScan}{" "}
            {tagscanReducer.result[0].MEINS}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            จำนวนป้ายลาเบลที่ถูกต้อง : {labelscanReducer.countCorrect}{" "}
            {tagscanReducer.result[0].MEINS}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            จำนวนป้ายลาเบลที่ผิด : {labelscanReducer.countInCorrect}{" "}
            {tagscanReducer.result[0].MEINS}
          </Typography>
        </CardContent>
      </Card>
      <form
        className={classes.margin}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(labelscanActions.count_scan());
          console.log(inputBarcode);
          console.log(tagscanReducer.result[0].EAN11);
          if (inputBarcode === tagscanReducer.result[0].EAN11) {
            dispatch(labelscanActions.count_correct());
            setBarcode("");
            console.log("ok");
          } else {
            dispatch(labelscanActions.count_incorrect());
            setBarcode2(inputBarcode);
            setBarcode("");
            alertOpen();
            console.log("no");
          }
        }}
      >
        <TextField
          id="barcode"
          autoFocus
          value={inputBarcode}
          onChange={(e) => {
            setBarcode(e.target.value);
          }}
          label="สแกนป้าย TAG"
          placeholder="SCAN TAG :"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <Button
        onClick={() => {
          handleSave();
        }}
        variant="contained"
        color="secondary"
        size="small"
        fullWidth
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        บันทึกข้อมูล
      </Button>
      <Button
        onClick={() => {
          dispatch(labelscanActions.count_clear({ ...props }));
        }}
        variant="contained"
        color="defualt"
        size="small"
        fullWidth
        className={classes.button}
        startIcon={<RefreshIcon />}
      >
        แสกนป้ายแท็กใหม่
      </Button>
    </div>
  );
}
