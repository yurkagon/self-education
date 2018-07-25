import React from 'react';
import { Route } from 'react-router-dom';
import Header from './../Header/Header';

const LayoutRoute = props => (
  <div>
    <Header />
    <Route {...props} />
  </div>
);

export default LayoutRoute;
