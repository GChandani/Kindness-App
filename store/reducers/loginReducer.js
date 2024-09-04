import { FORM_INPUT_UPDATE, FORM_INPUT_CLEAR } from "../actions/types";

const initialState = {
  formIsValid: {},
  inputValidities: {},
  inputValues: {}
};

const loginReducer = (state = initialState, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  if (action.type === FORM_INPUT_CLEAR) {
    return {
      ...initialState
    };
  }
  return { ...state };
};

export default loginReducer;