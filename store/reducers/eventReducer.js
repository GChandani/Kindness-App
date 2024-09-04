import { SET_EVENT_DATA } from "../actions/types";

const initialState = {
  eventCardData: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_DATA:
      return {
        ...state,
        eventCardData: action.eventCardData
      };
    default:
      return { ...state };
  }
};

export default eventReducer;