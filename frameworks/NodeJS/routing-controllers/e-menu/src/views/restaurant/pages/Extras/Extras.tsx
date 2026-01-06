import React, { Component } from "react";

import { goBack } from "views/restaurant/utils/LinkBack";

import PrimaryButton from "../../components/PrimaryButton";
import CloseButton from "../../components/CloseButton";

import "./style.scss";

class Extras extends Component {
  onClickFunc = () => {
    // eslint-disable-next-line
    console.log(1);
  };

  render() {
    return (
      <div className="extras">
        <CloseButton onClick={() => goBack()} />
        <div className="extras-content">
          <h1 className="changes-in-dish">Внеси зміни у назва страви</h1>

          <div className="extra-components">
            <div className="additives-header">
              <h2 className="additives">Додатки</h2>
            </div>
            <label className="container">
              <input className="checkbox" type="checkbox" />
              <span className="checkmark" />
              <div className="text">
                Додаток<span className="price"> +35 грн</span>
              </div>
            </label>
          </div>
        </div>

        <PrimaryButton onClick={this.onClickFunc} className="ready-button">
          Готово
        </PrimaryButton>
      </div>
    );
  }
}

export default Extras;
