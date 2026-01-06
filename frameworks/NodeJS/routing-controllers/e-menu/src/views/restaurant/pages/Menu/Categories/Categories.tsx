import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import RestaurantStore from "stores/RestaurantStore";

import MenuStore from "../../../stores/MenuStore";

import Preloader from "./Preloader";
import Category from "./Category";

import { ICategoriesProps } from "./types";

import "./style.scss";

@observer
class Categories extends Component<ICategoriesProps> {
  state = {
    isLoaded: MenuStore.isDataExist,
  };

  async componentDidMount() {
    try {
      await MenuStore.load(RestaurantStore.data._id);
    } catch {
    } finally {
      this.setState({ isLoaded: true });
    }
  }

  onCategoryClick(id: string) {
    const { history, match } = this.props;

    const { restaurant_slug } = match.params;

    history.push(`/r/${restaurant_slug}/cat/${id}`);
  }

  render() {
    const { isLoaded } = this.state;

    return (
      <div className="categories">
        {!isLoaded && <Preloader />}

        {isLoaded &&
          MenuStore.isDataExist &&
          MenuStore.data.categories.map((category) => (
            <Category
              key={category._id}
              data={category}
              onClick={() => this.onCategoryClick(category._id)}
            />
          ))}
      </div>
    );
  }
}

export default withRouter(Categories);
