import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import setAuthToken from "./utils/setAuthToken";

const initialStore = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.access !== currentState.auth.access) {
    const access = currentState.auth.access;
    setAuthToken(access);
  }
});

export default store;
