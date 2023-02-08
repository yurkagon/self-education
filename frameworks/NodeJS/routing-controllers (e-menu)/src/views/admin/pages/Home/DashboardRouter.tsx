import React, { Suspense } from "react";
import { observer } from "mobx-react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

import Page404 from "../Page404";

import LoadingScreen from "../../components/LoadingScreen";

import DashboardState from "./DashboardState";

const DashboardRouter = () => (
  <main className="c-main">
    <CContainer fluid>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          {DashboardState.routerConfig.map(
            (route, idx) =>
              route.component && (
                <Route
                  key={idx} // eslint-disable-line
                  path={route.path}
                  exact={route.exact}
                  // @ts-ignore
                  name={route.name}
                  render={(props) => (
                    <CFade>
                      <route.component {...(props as any)} />
                    </CFade>
                  )}
                />
              )
          )}

          <Redirect
            exact
            from={DashboardState.rootPath}
            to={DashboardState.initialPage}
          />

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </CContainer>
  </main>
);

export default observer(DashboardRouter);
