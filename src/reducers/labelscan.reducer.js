import {
  LABELSCAN_COUNT,
  LABELSCAN_CORRECT,
  LABELSCAN_INCORRECT,
  LABELSCAN_CLEAR,
  LABELSCAN_FAILED
} from "../Constants";

const initialState = {
  countScan: 0,
  countCorrect: 0,
  countInCorrect: 0,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LABELSCAN_COUNT:
      return { ...state, countScan: state.countScan + 1 };
    case LABELSCAN_CORRECT:
      return { ...state, countCorrect: state.countCorrect + 1 };
    case LABELSCAN_INCORRECT:
      return { ...state, countInCorrect: state.countInCorrect + 1 };
    case LABELSCAN_FAILED:
      return { ...state, isError: true };
   case LABELSCAN_CLEAR:
        return initialState;
    default:
      return state;
  }
};
