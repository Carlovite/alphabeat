import {
  DELETE_DATA,
  GET_DATA,
  GET_DATA_REALTIME,
  EDIT_DATA,
} from "../actions";

const initialState = {
  stock: [],
};

const beatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        stock: action.payload,
      };
    case DELETE_DATA:
      return {
        ...state,
      };
    case GET_DATA_REALTIME:
      return {
        ...state,
        stock: action.payload,
      };
    case EDIT_DATA:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default beatReducer;
