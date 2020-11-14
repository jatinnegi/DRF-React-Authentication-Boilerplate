import axios from "axios";
import { AUTH_ERROR } from "../actions/types";
import store from "../store";
import { getNewAccessToken } from "../actions/auth";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      if (localStorage.getItem("refresh")) {
        const refresh = localStorage.getItem("refresh");
        getNewAccessToken(refresh);
      } else {
        store.dispatch({ type: AUTH_ERROR });
      }
    }

    return Promise.reject(err);
  }
);

export default api;
