import {
    TAGSCAN_FETCHING,
    TAGSCAN_SUCCESS,
    TAGSCAN_FAILED,
    TAGSCAN_CLEAR
  } from "../Constants";
import axios from "axios";

export const setStateToSuccess = (payload) => ({
    type: TAGSCAN_SUCCESS,
    payload,
  });
  
 export const setStateToFetching = () => ({
    type: TAGSCAN_FETCHING,
  });
  
  export const setStateToFailed = (payload) => ({
    type: TAGSCAN_FAILED,
    payload: payload,
  });
  
 

  export const getTagDetail = ({inputTagScan,history}) => {
    return async (dispatch) => {
      dispatch(setStateToFetching());
      try{
      console.log(inputTagScan)
      var TAG = inputTagScan.slice(-10);
      console.log (TAG)
      var result = await axios.get(`/apis/getTAG/${TAG}`);
      console.log(result.data);
      if (result.data != ""){
      dispatch(setStateToSuccess(result.data));
      history.push("/labelscan");
      }else{
      dispatch(setStateToFailed("no"));
      history.push("/tagscan");
      }
      }catch (err){
      dispatch(setStateToFailed());
      history.push("/tagscan");
      }
    };
  };
  
 

  