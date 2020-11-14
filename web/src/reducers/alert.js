import { CREATE_ALERTS, CLEAR_ALERTS } from "../actions/types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ALERTS:
      return payload;

    case CLEAR_ALERTS:
      return [];

    default:
      return state;
  }
};

export default alertReducer;
