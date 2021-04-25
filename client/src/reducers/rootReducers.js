import { SET_DATA } from "./actionTypes";

const initialState = {
  high: null,
  low: null,
  open: null,
  close: null,
  currency: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        open: action.payload.open,
        high: action.payload.high,
        low: action.payload.low,
        close: action.payload.close,
        currency: action.payload.currency
      };
    default:
      return state;
  }
}
export default rootReducer;
