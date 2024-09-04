import { SET_HOME_DATA } from "../actions/types";

const initialState = {
  homeCardData:[]
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_DATA:
      return {
        ...state,
        homeCardData: action.homeCardData
      };
    default:
      return { ...state };
  }
};

export default homeReducer;