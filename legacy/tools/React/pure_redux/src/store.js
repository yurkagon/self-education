import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const initialState = {
  data: 'none',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setData':
      return {...state, data: action.data}
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;