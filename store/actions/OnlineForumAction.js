import { SET_ONLINE_FORUM_DATA, SET_COMMENT_DATA } from "./types";

export const setOnlineData = (onlineData) => {
  return ({
    type: SET_ONLINE_FORUM_DATA,
    onlineCardData: onlineData
  })
};
