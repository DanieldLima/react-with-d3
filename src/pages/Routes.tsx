import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "../components/Navigation";

import BarChartPage from "./BarChartPage";
import GaugeChartPage from "./GaugeChartPage";

const Routes = () => {

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={BarChartPage} />
        <Route exact path="/gauge-chart" component={GaugeChartPage} />
      </Switch>
    </Router>
  );
};

export default Routes;