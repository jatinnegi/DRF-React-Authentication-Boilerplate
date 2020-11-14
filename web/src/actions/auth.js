import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  CREATE_ALERTS,
  CLEAR_ALERTS,
  UPDATE_ACCESS_TOKEN,
  LOAD_USER,
  UPDATE_PROFILE,
  LOGOUT,
} from "./types";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => (dispatch) => {
  api
    .get("users/me")
    .then((res) => {
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 401 && localStorage.getItem("refresh")) {
        const refresh = localStorage.getItem("refresh");
        dispatch(getNewAccessToken(refresh));
      } else {
        dispatch({ type: AUTH_ERROR });
      }
    });
};

export const register = (formData) => (dispatch) => {
  const { username, password } = formData;
  const body = JSON.stringify(formData);

  api
    .post("users/", body)
    .then((res) => {
      dispatch({
        type: CLEAR_ALERTS,
      });

      dispatch(login({ username, password }));
    })
    .catch((err) => {
      const allErrors = err.response.data;
      let errors = [];

      for (let key in allErrors) {
        let msg;
        const type = "error";

        if (allErrors[key][0] === "This field may not be blank.")
          msg = `${key} is required`;
        else msg = allErrors[key][0];

        msg = msg.charAt(0).toUpperCase() + msg.slice(1);

        const error = { msg, type };

        errors.push(error);
      }
      dispatch({
        type: CREATE_ALERTS,
        payload: errors,
      });
      dispatch({
        type: AUTH_ERROR,
      });
      window.scrollTo(0, 0);
    });
};

export const login = (formData) => (dispatch) => {
  const body = JSON.stringify(formData);

  api
    .post("token/", body)
    .then((res) => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ALERTS,
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      const allErrors = err.response.data;
      let errors = [];

      for (let key in allErrors) {
        let msg;
        const type = "error";

        if (typeof allErrors[key] === "string") {
          msg = allErrors[key];
        } else {
          if (allErrors[key][0] === "This field may not be blank.")
            msg = `${key} is required`;
          else msg = allErrors[key][0];
        }

        msg = msg.charAt(0).toUpperCase() + msg.slice(1);

        const error = { msg, type };

        errors.push(error);
      }
      dispatch({
        type: CREATE_ALERTS,
        payload: errors,
      });
      window.scrollTo(0, 0);
    });
};

export const getNewAccessToken = (refresh) => (dispatch) => {
  let body = {
    refresh,
  };
  body = JSON.stringify(body);

  api
    .post("token/refresh/", body)
    .then((res) => {
      dispatch({ type: UPDATE_ACCESS_TOKEN, payload: res.data });
      setAuthToken(res.data.access);
      dispatch(loadUser());
    })
    .catch((err) => dispatch({ type: AUTH_ERROR }));
};

export const updateProfile = (formData) => (dispatch) => {
  const body = JSON.stringify(formData);

  api.put("users/me/", body).then((res) => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    const alerts = [{ type: "success", msg: "Profile Updated!" }];
    dispatch({ type: CREATE_ALERTS, payload: alerts });
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
