import React, { Fragment, Component } from "react";
import { observer } from "mobx-react";

import "react-lazy-load-image-component/src/effects/blur.css";

import GlobalLoader from "stores/GlobalLoader";

import Router from "./Router";

import ErrorBoundary from "./components/ErrorBoundary";
import DefaultSEO from "./components/DefaultSEO";

import LoadingScreen from "./components/LoadingScreen";

import "./style.scss";

@observer
class RestaurantApplication extends Component {
  render() {
    return (
      <div className="restaurant-view">
        {GlobalLoader.isLoading && <LoadingScreen overlay />}

        <ErrorBoundary>
          <Fragment>
            <DefaultSEO />

            <Router />
          </Fragment>
        </ErrorBoundary>
      </div>
    );
  }
}

export default RestaurantApplication;
