import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";

import Main from "./Main";
import SignIn from "./SignIn/SignIn";
import PlaceholderForm from "./PlaceholderForm";
import PlaceholderMagic from "./PlaceholderMagic";
import MagicLink from "../MagicLink/MagicLink";
import history from "../history";

const App = () => {
  useEffect(() => {
    if (!history.location.pathname.includes("/magic")) {
      if (localStorage.getItem("admin-is-logged-in") === "true") {
        history.push({
          pathname: `/main=${localStorage.getItem("admin-logged-in-jti")}`,
          state: {
            jti: localStorage.getItem("admin-logged-in-jti"),
            userID: localStorage.getItem("admin-logged-in-userid")
          }
        });
      }
    }
  });

  return (
    <Router history={history}>
      <div>
        <Route path="/" exact component={SignIn} />
        {/* <Route path="/dashboard=:jti" exact render={() => <Dashboard />} /> */}
        <Route path="/main=:jti" render={props => <Main {...props} />} />
        <Route path="/placeholderform" exact component={PlaceholderForm} />
        <Route path="/placeholderform=:id" exact component={PlaceholderMagic} />
        <Route path="/magic=:id" exact component={MagicLink} />
      </div>
    </Router>
  );
};

export default App;
