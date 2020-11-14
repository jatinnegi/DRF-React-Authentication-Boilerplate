import api from "./api";

const setAuthToken = (access) => {
  if (access) {
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    localStorage.setItem("access", access);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("access");
  }
};

export default setAuthToken;
