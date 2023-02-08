import React, { Component } from "react";
import { Helmet } from "react-helmet";

import DishService from "services/DishService";

import RingButton from "views/restaurant/components/RingButton";

import { goBack } from "views/restaurant/utils/LinkBack";

import Page404 from "../Page404";

import PrimaryButton from "../../components/PrimaryButton";
import CloseButton from "../../components/CloseButton";

import img from "../../assets/images/dish.svg";

import { IDishDetailProps, IDishDetailState } from "./types";

import "./style.scss";

class DishDetail extends Component<IDishDetailProps, IDishDetailState> {
  state: IDishDetailState = {
    isLoading: true,
    data: null,
  };

  async componentDidMount() {
    const { match } = this.props;

    try {
      const dish = await DishService.get(match.params.dishId);

      this.setState({ data: dish, isLoading: false });
    } catch {
      this.setState({ isLoading: false });
    }
  }

  onClickFunc = () => {
    // eslint-disable-next-line
    console.log(1);
  };

  render() {
    const { data, isLoading } = this.state;

    // TODO: add spinner
    if (isLoading) return null;

    if (!isLoading && !data) return <Page404 />;

    return (
      <div className="dish-detail">
        <Helmet>
          <title>{data.name.ua}</title>
        </Helmet>

        <CloseButton onClick={() => goBack()} />
        <div className="dish-image">
          <img src={img} alt="" />
        </div>
        <div className="dish-description">
          <h2>{data.name.ua}</h2>
          <h3>{data.price} грн.</h3>
          <p>{data.description}</p>
          <div className="buttons-panel">
            <PrimaryButton
              onClick={this.onClickFunc}
              className="button-align-left"
            >
              Додати до замовлення
            </PrimaryButton>
            <RingButton onClick={() => null} />
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
