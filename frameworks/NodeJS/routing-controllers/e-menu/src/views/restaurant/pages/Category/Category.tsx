import React, { Component } from "react";

import { observer } from "mobx-react";
import { Helmet } from "react-helmet";

import RestaurantStore from "stores/RestaurantStore";

import CategoryState from "./CategoryState";

import Dishes from "./Dishes";

import { ICategoryProps } from "./types";

@observer
class Category extends Component<ICategoryProps> {
  async componentDidMount() {
    const { match } = this.props;
    const { categoryId } = match.params;

    CategoryState.load(categoryId, RestaurantStore.data._id);
  }

  componentWillUnmount() {
    CategoryState.removeData();
  }

  render() {
    return (
      <div className="category-page">
        {CategoryState.isDataExist && (
          <Helmet>
            <title>{CategoryState.categoryName}</title>
          </Helmet>
        )}

        <Dishes />
      </div>
    );
  }
}

export default Category;
