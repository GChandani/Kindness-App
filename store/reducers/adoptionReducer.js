import { SET_ADOPTION_DATA } from "../actions/types";

const initialState = {
  adoptionCardData: []
};

const adoptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADOPTION_DATA:
      return {
        ...state,
        adoptionCardData: action.adoptionCardData
      };
    default:
      return { ...state };
  }
};

export default adoptionReducer;