import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  CHeader,
  CToggler,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";

import RestaurantStore from "stores/RestaurantStore";

import Configuration from "utils/Configuration";

import DashboardState from "../DashboardState";

import Dropdown from "./Dropdown";

import "./style.scss";

@observer
class Header extends Component {
  private config = new Configuration();

  toggleSidebar = () => {
    const state = [true, "responsive"].includes(
      DashboardState.sidebarState.state
    )
      ? false
      : "responsive";

    DashboardState.sidebarState.setState(state);
  };

  toggleSidebarMobile = () => {
    const state = [false, "responsive"].includes(
      DashboardState.sidebarState.state
    )
      ? true
      : "responsive";

    DashboardState.sidebarState.setState(state);
  };

  render() {
    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none side-bar-toggler-header"
          onClick={this.toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={this.toggleSidebar}
        />
        {RestaurantStore.isDataExist && (
          <a
            className="restaurant-name-link d-md-block d-lg-none"
            href={`${this.config.baseUrl}/r/${RestaurantStore.data.slug}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {RestaurantStore.name ? RestaurantStore.name : "name"}
          </a>
        )}

        <CHeaderNav className="d-md-down-none mr-auto" />
        <CHeaderNav className="px-3">
          <Dropdown />
        </CHeaderNav>

        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={DashboardState.routerConfig}
          />
        </CSubheader>
      </CHeader>
    );
  }
}

export default Header;
