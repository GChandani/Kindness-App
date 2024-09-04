import { SET_ADOPTION_DATA } from "./types";

export const setAdoptionData = (adoptionData) => {
  return ({
    type: SET_ADOPTION_DATA,
    adoptionCardData: adoptionData
  })
};


// export const addAdoptionObj= (
//   adoptionData
// ) => (dispatch, getState) => {
//   var adoptionList = getState().adoption.adoptionCardData
//     ? getState().adoption.adoptionCardData
//     : [];
//     adoptionList.unshift(adoptionData);
//     dispatch(setAdoptionData(adoptionList))
// }
