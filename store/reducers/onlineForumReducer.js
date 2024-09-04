import { SET_ONLINE_FORUM_DATA, SET_COMMENT_DATA } from "../actions/types";

const initialState = {
  onlineCardData: [],
  commentData: [],
  commentId: ""
};

const onlineForumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE_FORUM_DATA:
      return {
        ...state,
        onlineCardData: action.onlineCardData
      };
    default:
      return { ...state };
  }
};

export default onlineForumReducer;