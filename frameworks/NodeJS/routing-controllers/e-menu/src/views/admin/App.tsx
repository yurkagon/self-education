import React, { Component } from "react";
import { observer } from "mobx-react";

import GlobalLoader from "stores/GlobalLoader";
import UserStore from "stores/UserStore";
import RestaurantStore from "stores/RestaurantStore";

import Router from "./Router";

import LoadingScreen from "./components/LoadingScreen";

import "./style.scss";

@observer
class AdminApplication extends Component {
  async UNSAFE_componentWillMount() {
    const unregister = GlobalLoader.registerLoadingProcess();

    try {
      const user = await UserStore.load();

      await RestaurantStore.loadByOwnerId(user._id);
    } catch {
    } finally {
      unregister();
    }
  }

  render() {
    return (
      <div className="admin-view">
        {GlobalLoader.isLoading ? <LoadingScreen /> : <Router />}
      </div>
    );
  }
}

export default AdminApplication;
