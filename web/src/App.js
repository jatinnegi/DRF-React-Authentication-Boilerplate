import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivatePage from "./components/PrivatePage";
import PrivateRoute from "./utils/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import EditProfile from "./components/EditProfile";

function App() {
  useEffect(() => {
    if (localStorage.getItem("access")) {
      const access = localStorage.getItem("access");
      setAuthToken(access);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={PrivatePage} />
          <PrivateRoute exact path="/edit" component={EditProfile} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
