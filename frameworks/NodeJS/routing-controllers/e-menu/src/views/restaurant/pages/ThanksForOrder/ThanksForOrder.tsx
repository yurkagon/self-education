import React, { FC } from "react";

import { goBack } from "../../utils/LinkBack";

import PrimaryButton from "../../components/PrimaryButton";

import { ReactComponent as ThanksImage } from "../../assets/images/thanksForOrder.svg";

import "./style.scss";

const ThanksForOrder: FC<{}> = () => (
  <div className="thanks-for-order">
    <div className="content">
      <div>
        <ThanksImage />
      </div>
      <div className="order-info">
        <h1 className="thanks">Дякуємо за замовлення!</h1>
        <h4 className="please-wait">
          Почекайте будь ласка: зараз до вас підійде офіціант.
        </h4>
        <h2 className="bon-appetit">Смачного!</h2>
      </div>
      <PrimaryButton className="down text" onClick={() => goBack()}>
        Зрозуміло
      </PrimaryButton>
    </div>
  </div>
);

export default ThanksForOrder;
