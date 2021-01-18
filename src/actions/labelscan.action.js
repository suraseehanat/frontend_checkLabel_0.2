import {
  LABELSCAN_CORRECT,
  LABELSCAN_INCORRECT,
  LABELSCAN_COUNT,
  LABELSCAN_CLEAR,
  LABELSCAN_FAILED
} from "../Constants";

export const setStateToCount = () => ({
  type: LABELSCAN_COUNT,
});

export const setStateToCorrect = () => ({
  type: LABELSCAN_CORRECT,
});
export const setStateToInCorrect = () => ({
  type: LABELSCAN_INCORRECT,
});

export const setStateToClear = () => ({
  type: LABELSCAN_CLEAR,
});
export const setStateToFailed = (payload) => ({
  type: LABELSCAN_FAILED,
  payload: payload,
});


export const count_scan = () => {
  return (dispatch) => {
    dispatch(setStateToCount());
  };
};

export const count_correct = () => {
  return (dispatch) => {
    dispatch(setStateToCorrect());
  };
};

export const count_incorrect = () => {
  return (dispatch) => {
    dispatch(setStateToInCorrect());
    dispatch(setStateToFailed("error"));
  };
};


export const count_clear = ({ history }) => {
  return async (dispatch) => {
   
    await  dispatch(setStateToClear());
    //history.push("/tagscan");
    history.push("/tagscan");
    
  };
};
