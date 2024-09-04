import { AUTHENTICATE, LOGOUT, COUNTRY, STATES } from '../actions/types';

const initialState = {
  userId: null,
  emailId: null,
  userName: null,
  countryId: null,
  stateId: null,
  userDetail: {},
  country: [],
  states: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.payload.userId,
        emailId: action.payload.emailId,
        userName: action.payload.userName,
        countryId:action.payload.countryId,
        stateId:action.payload.stateId,
      };
    case COUNTRY:
      return {
        ...state,
        country: action.payload.country
      };
    case STATES:
      return {
        ...state,
        states: action.payload.states
      };
    case LOGOUT:
      return {
        userId: null,
        emailId: null,
        userName: null,
        countryId: null,
        stateId: null,
        country: [],
        states: []
      };
    default:
      return { ...state };
  }
};

export default authReducer;
