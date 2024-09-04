import { SET_SOS_DATA } from "./types";

export const setSosData = (sosData) => {
  return ({
    type: SET_SOS_DATA,
    sosCardData: sosData
  })
};