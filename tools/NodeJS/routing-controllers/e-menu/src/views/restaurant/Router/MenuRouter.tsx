import React, { Suspense, Component } from "react";
import { Switch, Route } from "react-router-dom";

import GlobalLoader from "stores/GlobalLoader";
import RestaurantStore from "stores/RestaurantStore";

import {
  Menu,
  Category,
  DishDetail,
  Extras,
  Page404,
  Cart,
  FeedBack,
  Order,
  ToOrder,
} from "../pages";

import LoadingScreen from "../components/LoadingScreen";

import MenuRoute from "./MenuRoute";

import { IMenuRouterProps } from "./types";

class MenuRouter extends Component<IMenuRouterProps> {
  public state = {
    isFailed: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const { restaurant_slug } = match.params;

    const unregister = GlobalLoader.registerLoadingProcess();

    try {
      await RestaurantStore.loadBySlug(restaurant_slug);
    } catch {
      this.setState({ isFailed: true });
    } finally {
      unregister();
    }
  }

  render() {
    const { isFailed } = this.state;

    if (isFailed) return <Page404 />;

    if (GlobalLoader.isLoading) return null;

    return (
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <MenuRoute path="/r/:restaurant_slug" exact component={Menu} />
          <MenuRoute
            path="/r/:restaurant_slug/feedback"
            exact
            component={FeedBack}
            disableBottomNavigation
          />
          <MenuRoute
            path="/r/:restaurant_slug/cat/:categoryId"
            exact
            component={Category}
          />
          <MenuRoute
            path="/r/:restaurant_slug/cart"
            exact
            component={Cart}
            disableBottomNavigation
          />
          <MenuRoute path="/r/:restaurant_slug/order" exact component={Order} />
          <MenuRoute
            path="/r/:restaurant_slug/to_order"
            exact
            component={ToOrder}
            disableBottomNavigation
          />
          <Route
            path="/r/:restaurant_slug/cat/:categoryId/dish/:dishId"
            exact
            component={DishDetail}
          />
          <Route path="/r/:restaurant_slug/extras" exact component={Extras} />

          <Route path="/r/:restaurant_slug" component={Page404} />
        </Switch>
      </Suspense>
    );
  }
}

export default MenuRouter;
