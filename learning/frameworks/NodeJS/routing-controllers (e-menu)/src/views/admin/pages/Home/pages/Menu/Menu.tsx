/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { observer } from "mobx-react";
import { CContainer, CCard, CCardBody, CCardHeader } from "@coreui/react";

import RestaurantStore from "stores/RestaurantStore";

import Spinner from "../../../../components/Spinner";

import MenuEditor from "./MenuEditor";

import MenuState from "./MenuEditor/MenuState";

@observer
class Menu extends Component {
  state = {
    isLoaded: false,
  };

  async componentDidMount() {
    await MenuState.loadMenu(RestaurantStore.data?._id);

    this.setState({ isLoaded: true });
  }

  componentWillUnmount() {
    MenuState.reset();
  }

  render() {
    const { isLoaded } = this.state;

    return (
      <CCard>
        <CCardHeader>Редагування меню</CCardHeader>

        <CCardBody>
          {!MenuState.error && (
            <CContainer>{isLoaded ? <MenuEditor /> : <Spinner />}</CContainer>
          )}

          {MenuState.error && (
            <div className="text-center text-danger">
              Упс! Щось пішло не так :(
            </div>
          )}
        </CCardBody>
      </CCard>
    );
  }
}

export default Menu;
