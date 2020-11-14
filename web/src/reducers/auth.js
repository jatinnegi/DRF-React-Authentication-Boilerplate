import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  UPDATE_ACCESS_TOKEN,
  LOAD_USER,
  UPDATE_PROFILE,
  LOGOUT,
} from "../actions/types";

const initialState = {
  refresh: null,
  access: null,
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS:
      localStorage.setItem("refresh", payload.refresh);
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        refresh: localStorage.getItem("refresh"),
        access: localStorage.getItem("access"),
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };

    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        ...payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      return {
        ...state,
        refresh: null,
        access: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
