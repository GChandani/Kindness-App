import { INPUT_CHANGE, INPUT_BLUR, INPUT_RESET } from "../actions/types";

const initialState = {
  value: {},
  isValid: {},
  touched: false
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_RESET:
      return {
        ...initialState,
        value: {},
        isValid: {}
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return { ...state };
  }

};

export default inputReducer;