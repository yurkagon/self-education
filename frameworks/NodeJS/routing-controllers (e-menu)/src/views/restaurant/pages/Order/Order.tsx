import React, { Component } from "react";
import BackButton from "../../components/BackButton";

import "./style.scss";
import OrderListItem from "./OrderListItem";

class Order extends Component {
  state = {
    list: [
      { id: 1, name: "Супчик", count: 2, price: 100 },
      { id: 2, name: "Бульйончик", count: 2, price: 100 },
      { id: 3, name: "Борщєц", count: 1, price: 300 },
    ],
  };

  render() {
    const { list } = this.state;

    return (
      <div>
        <BackButton />
        <div className="order">
          <p className="text">моє замовлення</p>
          <div className="order-container">
            <div className="table">
              {list.map((items) => (
                <OrderListItem data={items} key={items.id} />
              ))}
              <div className="description-container">
                <p className="description">очікує підтвердження</p>
              </div>
            </div>
            <div className="table">
              {list.map((items) => (
                <OrderListItem data={items} key={items.id} />
              ))}
              <div className="description-container">
                <p className="description">підтверджено</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
