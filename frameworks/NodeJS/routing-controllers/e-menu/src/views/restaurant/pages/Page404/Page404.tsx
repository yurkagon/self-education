import React, { FC } from "react";

import RestaurantStore from "stores/RestaurantStore";

import { goBack } from "../../utils/LinkBack";

import PrimaryButton from "../../components/PrimaryButton";

import { ReactComponent as Pizza } from "../../assets/images/pizza.svg";

import "./style.scss";

const PageNotFound: FC<{}> = () => (
  <div className="page-not-found">
    <div className="pizza">
      <Pizza />
      <h1 className="error">404</h1>
      <p className="main-error-text">
        Сторінка була вкрадена зловмисником разом зі шматочком піци!
      </p>
      <p className="secondary-error-text">
        (не переймайтесь, ведуться розшуки)
      </p>
    </div>
    {RestaurantStore.isDataExist && (
      <PrimaryButton className="down" onClick={() => goBack()}>
        Повернутися назад
      </PrimaryButton>
    )}
  </div>
);

export default PageNotFound;
