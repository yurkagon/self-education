import { SET_NAME } from './../actions/profile';

const initialState = {
  name: "Yurkagon",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_NAME:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default profileReducer;