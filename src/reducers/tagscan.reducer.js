import {
  TAGSCAN_SUCCESS,
  TAGSCAN_FETCHING,
  TAGSCAN_FAILED,
} from "../Constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TAGSCAN_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case TAGSCAN_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case TAGSCAN_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
