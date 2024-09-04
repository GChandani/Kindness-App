import { SET_HOME_DATA } from "./types";

export const setHomeData = (homeData) => {
  return ({
    type: SET_HOME_DATA,
    homeCardData: homeData
  })
};
