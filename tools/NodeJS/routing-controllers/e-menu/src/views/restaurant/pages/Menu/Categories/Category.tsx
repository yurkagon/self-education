import React, { FC } from "react";

import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow_right.svg";
// TODO: change in future to a real icon
import { ReactComponent as CategoryTestIcon } from "../../../assets/icons/category_test_icon.svg";

import { ICategoryProps } from "./types";

const Category: FC<ICategoryProps> = ({ data, onClick }) => (
  <div className="category" onClick={onClick}>
    <div className="wrapper">
      <div className="name">
        <CategoryTestIcon className="cat_logo" />
        <span className="title">{data.name.ua}</span>
      </div>
      <div className="arrow">
        <ArrowIcon />
      </div>
    </div>
  </div>
);

export default Category;
