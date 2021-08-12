import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import jwtDecode from "jwt-decode";

import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/signup";
import MemberHome from "./pages/MemberHome/memberHome";
import ScrollToTop from "./ScrollToTop";

/* REDUX */
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Utils
import AuthRoute from "./utils/authRoute";
import AuthRouteAdmin from "./utils/authRouteAdmin";
import AuthRouteAll from "./utils/authRouteAll";


axios.defaults.baseURL = "http://localhost:5000";

const token  = localStorage.LendABookToken;

//Check validity of JWT token
if (token) {
  const decodedToken = jwtDecode(token);
  //Check if token is expired
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Switch>
            <AuthRoute path="/" exact component={Home} />
            <AuthRoute path="/sign-in" exact component={Login} />
            <AuthRoute path="/register" exact component={Register} />
            <AuthRouteAll path="/homepage" exact component={MemberHome} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
