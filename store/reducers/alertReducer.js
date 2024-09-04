import { SHOW_ALERT, HIDE_ALERT } from '../actions/types';

const initialState = {
  showAlert: false,
  showType: "success",
  showMessage: "",
  showTitle: ""
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: action.showAlert,
        showType: action.showType,
        showMessage: action.showMessage,
        showTitle: ""
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: action.showAlert,
        showType: "success",
        showMessage: "",
        showTitle: ""
      };
    default:
      return { ...state };
  }
};

export default alertReducer;
