import Axios from 'axios';

export const SET_DATA = "SET_DATA";

export const setData = data => ({
  type: SET_DATA,
  payload: data,
});

export const fetchData = () => async (dispatch) => {
  const data = await Axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch(setData(data.data));
};