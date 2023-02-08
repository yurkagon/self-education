import React, { Component } from "react";
import classnames from "classnames";
import BackButton from "../../components/BackButton";
import PrimaryButton from "../../components/PrimaryButton";

import { ReactComponent as CardIcon } from "../../assets/icons/cards.svg";
import { ReactComponent as CashIcon } from "../../assets/icons/cash.svg";

import { ICartProps, ICartState } from "./types";

import "./style.scss";

class Cart extends Component<ICartProps, ICartState> {
  state = {
    price: 120,
    isActive: null,
    rangeValue: 15,
  };

  handleRangeChange = (event) => {
    this.setState({ rangeValue: event.target.value });
  };

  handleCash = () => {
    this.setState({
      isActive: "cash",
    });
  };

  handleCard = () => {
    this.setState({
      isActive: "card",
    });
  };

  render() {
    const { price, isActive, rangeValue } = this.state;

    return (
      <div className="cart-page">
        <BackButton />
        <div className="order-amount">
          <div className="order-amount-text">
            <p className="text">сума замовлень:</p>
            <p className="order-amount">{price}$</p>
          </div>
        </div>
        <div className="gratitude">
          <div className="title">Подяка офіціанту:</div>
          <div className="sum">$ {Math.round((rangeValue / 100) * price)}</div>
          <div className="range">
            <input
              type="range"
              min="0"
              max="30"
              value={rangeValue}
              onChange={this.handleRangeChange}
            />
          </div>
          <div className="scale">
            <span>0%</span>
            <span>15%</span>
            <span>30%</span>
          </div>
        </div>
        <div className="payment-amount">
          <div className="amount-text">
            <p className="text">до сплати:</p>
            <p className="amount">
              {Math.round((rangeValue / 100) * price) + price}$
            </p>
          </div>
        </div>
        <div className="cash-card-check">
          <div className="cash-card-check-container">
            <div
              className={classnames("cash-option", {
                active: isActive === "cash",
              })}
              onClick={this.handleCash}
            >
              <CashIcon className="cashIcon" />
              <div className="text">Оплата готівкою</div>
            </div>
            <div
              className={classnames("credit-card-option", {
                active: isActive === "card",
              })}
              onClick={this.handleCard}
            >
              <CardIcon className="cardIcon" />
              <div className="text">Оплата карткою</div>
            </div>
          </div>
        </div>
        <div className="order-container">
          <PrimaryButton>Викликати офіціанта</PrimaryButton>
        </div>
      </div>
    );
  }
}

export default Cart;
