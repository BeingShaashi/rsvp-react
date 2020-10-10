import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../Views/Dashboard/Dashboard";

import RegistrationScreen from "../Views/RegistrationScreen/RegistrationScreen";
import RsvpDetails from "../Views/RsvpList/RsvpDetails";
import RsvpList from "../Views/RsvpList/RsvpList";
import RedirectRoute from "./RedirectRoute";

function AppNavigator() {
  return (
    <Router>
      <Switch>
        <RedirectRoute path="/" exact pathname="/register" />
        <Route path="/users" exact component={RsvpList} />
        <Route path="/users/:_id" exact component={RsvpDetails} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/register" component={RegistrationScreen} />
      </Switch>
    </Router>
  );
}

export default AppNavigator;
