import { AsyncStorage } from 'react-native';
import { AUTHENTICATE, LOGOUT, COUNTRY, STATES } from "./types";

export const login = (apiData) => {
  return {
    type: AUTHENTICATE,
    payload: { userId: apiData.userID, emailId: apiData.Email, userName: apiData.Name, countryId:apiData.countryId,stateId:apiData.stateId }
  };

};

export const stateList = (apiData) => {
  return {
    type: STATES,
    payload: { states: apiData }
  };
};

export const countryList = (apiData) => {
  return {
    type: COUNTRY,
    payload: { country: apiData }
  };
};

export const authenticate = (userId, email, name) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, userId: userId, emailId: email, userName: name });
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  // NavigationActions.navigate({ routeName: 'LoginScreen' });
  return { type: LOGOUT };
};
