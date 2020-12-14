import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "../components/Navigation";

import BarChartPage from "./BarChartPage";
import GaugeChartPage from "./GaugeChartPage";
import BBTimelinePage from "./BBTimelinePage";

const Routes = () => {

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={BarChartPage} />
        <Route path="/gauge-chart" component={GaugeChartPage} />
        <Route path="/gauge-chart" component={GaugeChartPage} />
        <Route path="/bbtimeline" component={BBTimelinePage} />
      </Switch>
    </Router>
  );
};

export default Routes;