import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Fragment } from "react";

import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/signup";

/* REDUX */
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
