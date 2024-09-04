import { SET_SOS_DATA } from "../actions/types";

const initialState = {
  sosCardData: []
};

const sosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOS_DATA:
      return {
        ...state,
        sosCardData: action.sosCardData
      };
    default:
      return { ...state };
  }
};

export default sosReducer;