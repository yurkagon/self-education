import { SET_DATA } from './../actions/main';

const initialState = {
  data: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_DATA:
    return { ...state, data: action.payload };
  default:
    return state;
  }
};

export default mainReducer;