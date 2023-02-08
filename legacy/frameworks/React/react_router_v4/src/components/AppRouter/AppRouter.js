import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import LayoutRoute from './LayoutRoute';

import MainPage from './../MainPage/MainPage';
import Page404 from './../ErrorPages/404';
import Options from './../Options/Options';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <LayoutRoute exact path="/" component={MainPage} />
      <LayoutRoute exact path="/options" component={Options} />
      <LayoutRoute component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
