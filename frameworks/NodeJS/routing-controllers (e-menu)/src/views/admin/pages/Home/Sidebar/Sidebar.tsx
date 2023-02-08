import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import RestaurantStore from "stores/RestaurantStore";

import Configuration from "utils/Configuration";

import DashboardState, { ISidebarState } from "../DashboardState";

import Logo from "../../../assets/icons/cafe.png";

import "./style.scss";

@observer
class Sidebar extends Component {
  private config = new Configuration();

  render() {
    return (
      <CSidebar
        show={DashboardState.sidebarState.state}
        onShowChange={(state: ISidebarState) =>
          DashboardState.sidebarState.setState(state)
        }
      >
        {RestaurantStore.isDataExist && (
          <a
            className="d-md-down-none restaurant-name-link"
            href={`${this.config.baseUrl}/r/${RestaurantStore.data.slug}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="restaurant-logo"
              src={Logo}
              alt="Logo of the restaurant"
            />
            {DashboardState.sidebarState.state && (
              <p className="restaurant-name">
                {RestaurantStore.name ? RestaurantStore.name : "name"}
              </p>
            )}
          </a>
        )}

        <CSidebarNav className="mt-2">
          <CCreateElement
            items={DashboardState.sidebarConfig}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none" />
      </CSidebar>
    );
  }
}

export default Sidebar;
