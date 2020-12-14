import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// import * as S from './Navigation.styles';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="app__navigation">
      <Link
        to="/"
        className={
          location.pathname === '/'
            ? `app__navigation__item app__navigation__item--active`
            : `app__navigation__item`
        }>
        BarChart
      </Link>
      <Link
        to="/gauge-chart"
        className={
          location.pathname === '/gauge-chart'
            ? `app__navigation__item app__navigation__item--active`
            : `app__navigation__item`
        }>
        GaugeChart
      </Link>
      <Link
        to="/bbtimeline"
        className={
          location.pathname === '/bbtimeline'
            ? `app__navigation__item app__navigation__item--active`
            : `app__navigation__item`
        }>
        BBTimeline
      </Link>
    </div>
  );
};

export default Navigation;