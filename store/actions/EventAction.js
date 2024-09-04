import { SET_EVENT_DATA } from "./types";

export const setEventData = (eventData) => {
  return ({
    type: SET_EVENT_DATA,
    eventCardData: eventData
  })
};